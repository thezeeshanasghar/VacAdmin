import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/rest-api.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  vaccine: any = {};
  FormValidation: FormGroup;
  constructor(
    public api: RestApiService, 
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

  async EditVaccine() {
    console.log(this.vaccine)
    await this.api.Editvaccine(this.route.snapshot.paramMap.get('id'), this.vaccine)
      .subscribe(res => {
        console.log('done');
        this.router.navigate(['/vaccine/']);
      }, (err) => {
        console.log(err);
      });
  }
  

}
