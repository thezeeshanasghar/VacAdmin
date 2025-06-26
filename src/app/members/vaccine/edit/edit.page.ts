import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VaccineService } from 'src/app/services/vaccine.service';
import { DoseService } from 'src/app/services/dose.service';
import { Toast } from '@capacitor/core';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  vaccine: any = {};
  fg: FormGroup;
  vaccineDetails: any;

  constructor(
    public api: VaccineService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private doseService: DoseService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      'Id': [null],
      'Name': ['', Validators.required],
      'MinAge': [null, Validators.required],
      'MaxAge': [null],
      'Validity': [null],
    });
    this.getSingleVaccine();


  }

  logForm() {
    console.log(this.fg)
  }

  async getSingleVaccine() {
    const loading = await this.loadingController.create({
      message: "Loading Vaccine"
    });

    await loading.present();
    let vaccineId = this.route.snapshot.paramMap.get('id');

    await this.api.getVaccineById(vaccineId).subscribe(
      res => {
        this.vaccine = res.ResponseData;
        loading.dismiss();
        this.fg.controls['Name'].setValue(this.vaccine.Name);
        this.fg.controls['MinAge'].setValue(this.vaccine.MinAge + '');
        this.fg.controls['Validity'].setValue(this.vaccine.Validity + '');
        if (this.vaccine.MaxAge)
          this.fg.controls['MaxAge'].setValue(this.vaccine.MaxAge + '');
        this.fg.controls['Id'].setValue(this.vaccine.Id + '');
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async editVaccine() {
    const loading = await this.loadingController.create({
      message: "Vaccine Editing in process"
    });

    await loading.present();
    let vaccineId = this.route.snapshot.paramMap.get('id');

    await this.api.editVaccine(vaccineId, this.fg.value)
      .subscribe(result => {
        if (result.IsSuccess) {
          this.vaccineDetails = result.ResponseData;
          console.log(this.vaccineDetails.Id);
          this.router.navigate(['/members/vaccine']);
          loading.dismiss();
          // this.getDosesByVaccineId(this.vaccineDetails.Id);

        } else {
          this.toastService.create('Error: Failed to edit Vaccine.');
          loading.dismiss();

        }
      }, (err) => {
        this.toastService.create('Error: Server Failure');
        loading.dismiss();
      });

  }

  async getDosesByVaccineId(VaccineId: string) {
    const loading = await this.loadingController.create({
      message: "Loading Doses"
    });

    let doseDetails: any;

    await loading.present();
    await this.doseService.getDoseByVaccineId(VaccineId)
      .subscribe(result => {
        if (result.IsSuccess) {
          doseDetails = result.ResponseData;
          loading.dismiss();
          if (doseDetails.length > 1) {
            this.updateDoses(doseDetails);
          }

        }
        else {
          this.toastService.create('Error: Failed to get Doses.');
          console.log('Get dose failed');
          loading.dismiss();

        }
      }, (err) => {
        this.toastService.create('Error: Server Failure');
        console.log(err);
        loading.dismiss();
      });

  }

  async updateDoses(doseDetails: any) {
    const loading = await this.loadingController.create({
      message: "Wait: Updating Dose Values."
    });

    for (let i = 1; i < doseDetails.length; i++) {
      await loading.present();
      doseDetails[i].MinGap = this.fg.value.MinAge;

      this.doseService.editDose(doseDetails[i].Id, doseDetails[i])
        .subscribe(result => {
          if (result.IsSuccess) {
            if (i == doseDetails.length - 1) {
              this.router.navigate(['/members/vaccine']);
            }
            loading.dismiss();
          }
          else {
            this.toastService.create('Error: failed to update MinGap of' + doseDetails[i].Name);
            loading.dismiss();
          }
        }, (err) => {
          this.toastService.create('Error: Server Failure');
          console.log(err);
          loading.dismiss();
        });

    }

  }





}
