import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {  ActivatedRoute } from '@angular/router';
import { VaccineService } from 'src/app/services/vaccine.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DosePage } from '../dose.page';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  dosses:any;
  fg: FormGroup;
  dose:any;
  constructor(
    public route: ActivatedRoute,
    public loadingController: LoadingController,
    public vaccineAPI:VaccineService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      'Name': [null, Validators.required],
      'MinAge': ['0', Validators.required],
      'MaxAge': [null],
      'MinGap': [null],
      'DoseOrder': [null],
      'VaccineID': [this.route.snapshot.paramMap.get('id')]
    });
    this.dose = this.route.snapshot.paramMap.get('id');
    console.log(this.dose);
    this.getDosses();
  }

  async getDosses() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.vaccineAPI.getDosesByVaccineId(this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        console.log(res);
        this.dosses = res.ResponseData;
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  // async editDose() {
  //   //let userData = { "ID": this.singlebrands.ID, "Name": this.Name, "VaccineID": this.singlebrands.VaccineID };
  //   //console.log(userData)
  //   await this.api.editBrand(dosses.ID, userData)
  //     .subscribe(res => {
  //       console.log('done');
  //       this.router.navigate(['/vaccine/']);
  //     }, (err) => {
  //       console.log(err);
  //     });
  // }

}
