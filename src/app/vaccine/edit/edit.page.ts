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
  FormValidation: FormGroup;
  constructor(
    public api: VaccineService, 
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.FormValidation = this.formBuilder.group({
      'VaccineName': [null, Validators.required],
      'MinAge': [null, Validators.required]
    });
    this.getVaccine();
    console.log('done')
  }

  logForm() {
    console.log(this.FormValidation)
  }

  async getVaccine() {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    await this.api.getVaccineById(this.route.snapshot.paramMap.get('id')).subscribe(
      res=>{
        console.log(res);
        this.vaccine = res.ResponseData;
        loading.dismiss();
      },
      err=>{
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async editVaccine() {
    console.log(this.vaccine)
    await this.api.editVaccine(this.route.snapshot.paramMap.get('id'), this.vaccine)
      .subscribe(res => {
        console.log('done');
        this.router.navigate(['/vaccine/']);
      }, (err) => {
        console.log(err);
      });
  }
  

}
