import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ChildService } from 'src/app/services/child.service';
import { ToastService } from 'src/app/shared/toast.service';
import * as moment from 'moment';

@Component({
  selector: 'app-child',
  templateUrl: './child.page.html',
  styleUrls: ['./child.page.scss'],
})
export class ChildPage implements OnInit {

  loginForm: FormGroup;
  childs: any;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private api: ChildService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'city': [''],
      'name': [''],
      'dob':[''],
      'gender':['']
    })
  }

  async onSubmit() {
    const loading = await this.loadingController.create({message: 'Loading'});
    await loading.present();
    if (this.loginForm.controls['dob'].value !== '')
    {
    this.loginForm.value.dob = moment(this.loginForm.value.dob, 'YYYY-MM-DD').format('YYYY-MM-DD');
    }
    await this.api.searchChild(
        this.loginForm.controls['name'].value,
        this.loginForm.controls['city'].value,
        //this.loginForm.controls['dob'].value,
        this.loginForm.value.dob,
        this.loginForm.controls['gender'].value
        )
      .subscribe(
        res => {
          if(res.IsSuccess)
            this.childs = res.ResponseData;
          else
            this.toastService.create(res.Message, 'danger');
          loading.dismiss();
        },
        err => {
          console.log(err);
          loading.dismiss();
        }
      );
  }
}
