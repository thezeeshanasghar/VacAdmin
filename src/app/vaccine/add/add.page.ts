import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  userData = { Name: "", MinAge: "", MaxAge: "" };
  FormValidation: FormGroup;
  constructor(
    public api: RestApiService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.FormValidation = this.formBuilder.group({
      'VaccineName': [null, Validators.required],
      'MinAge': [null, Validators.required]
    });
  }

  logForm() {
    console.log(this.FormValidation)
  }
  
  async AddVaccine() {
    console.log(this.userData)
    await this.api.Addvaccine(this.userData)
      .subscribe(res => {
        console.log('done');
        this.router.navigate(['/vaccine/']);
      }, (err) => {
        console.log(err);
      });
  }



}
