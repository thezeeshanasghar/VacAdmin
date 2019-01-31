import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoseService } from 'src/app/services/dose.service';

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
  ) {
  }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      'Name': [null, Validators.required],
      'MinAge': ['0', Validators.required],
      'MaxAge': [null],
      'MinGap': [null],
      'DoseOrder': [null],
      'VaccineID': [null]
    });

    this.getDose();
  }

  // Get single Dose data by ID
  async getDose() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.doseService.getDoseById(this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        console.log(res);
        this.dose = res.ResponseData;
        loading.dismiss();
        this.fg.controls['Name'].setValue(this.dose.Name);
        this.fg.controls['MinAge'].setValue(this.dose.MinAge + '');
        this.fg.controls['MaxAge'].setValue(this.dose.MaxAge + '');
        this.fg.controls['MinGap'].setValue(this.dose.MinGap + '');
        this.fg.controls['DoseOrder'].setValue(this.dose.DoseOrder);
        this.fg.controls['VaccineID'].setValue(this.dose.VaccineID);
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  // Send the request server for Edit Dose
  async editDose() {
    console.log(this.fg.value)

    await this.doseService.editDose(this.route.snapshot.paramMap.get('id'), this.fg.value)
      .subscribe(res => {
        console.log('done');
        this.router.navigate(['/vaccine/']);
      }, (err) => {
        console.log(err);
      });
  }

}
