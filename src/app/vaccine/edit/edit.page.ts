import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VaccineService } from 'src/app/services/vaccine.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  vaccine: any = {};
  fg: FormGroup;
  constructor(
    public api: VaccineService, 
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      'ID':[null],
      'VaccineName': ['', Validators.required],
      'MinAge': [null, Validators.required],
      'MaxAge': [null]
    });
    this.getSingleVaccine();
   

  }

  logForm() {
    console.log(this.fg)
  }

  async getSingleVaccine() {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    await this.api.getVaccineById(this.route.snapshot.paramMap.get('id')).subscribe(
      res=>{
        console.log(res);
        this.vaccine = res.ResponseData;
        loading.dismiss();
        this.fg.controls['VaccineName'].setValue(this.vaccine.Name);
        this.fg.controls['MinAge'].setValue(this.vaccine.MinAge+'');
        this.fg.controls['MaxAge'].setValue(this.vaccine.MaxAge+'');
        this.fg.controls['ID'].setValue(this.vaccine.ID+'');
      },
      err=>{
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async editVaccine() {
    let id = this.route.snapshot.paramMap.get('id')
    console.log(id);
    console.log(this.fg);
    await this.api.editVaccine(this.route.snapshot.paramMap.get('id'), this.fg.value)
      .subscribe(res => {
        console.log('done');
        this.router.navigate(['/vaccine/']);
      }, (err) => {
        console.log(err);
      });
  }
  

}
