import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoseService } from 'src/app/services/dose.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  dose: any;
  fg: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public loadingController: LoadingController,
    public doseService: DoseService,
    public router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      'Name': [null, Validators.required],
      'MinAge': ['0', Validators.required],
      'MaxAge': [null],
      'MinGap': [null],
       DoseOrder: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Add DoseOrder control
      'VaccineId': [null],
    });

    this.getDose();
  }

  // Get single Dose data by ID
  async getDose() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.doseService.getDoseById(this.route.snapshot.paramMap.get('id1')).subscribe(
      res => {
        console.log(res);
        this.dose = res.ResponseData;
        loading.dismiss();
        this.fg.controls['Name'].setValue(this.dose.Name);
        this.fg.controls['MinAge'].setValue(this.dose.MinAge + '');
        if(this.dose.MaxAge)
        this.fg.controls['MaxAge'].setValue(this.dose.MaxAge + '');
        if(this.dose.MinGap)
        this.fg.controls['MinGap'].setValue(this.dose.MinGap + '');
        this.fg.controls['DoseOrder'].setValue(this.dose.DoseOrder);
        this.fg.controls['VaccineId'].setValue(this.dose.VaccineId);
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  // Send the request server for Edit Dose
  async editDose() {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();

    await this.doseService.editDose(this.route.snapshot.paramMap.get('id1'), this.fg.value)
      .subscribe(res => {
        if (res.IsSuccess) {
          loading.dismiss();
          this.toastService.create('Dose updated successfully.')
          this.router.navigateByUrl('/members/vaccine/' + this.route.snapshot.paramMap.get('id') + '/doses');
        }
        else
          this.toastService.create(res.message, 'danger');

      }, (err) => {
        console.error(err);
        this.toastService.create(err), 'danger';
      });
  }

}
