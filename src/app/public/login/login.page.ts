import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  fg: FormGroup;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private api: LoginService,
    private toast: ToastService,
  ) { }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      'MobileNumber': [null, Validators.required],
      'Password': [null, Validators.required],
      'CountryCode':['92'],
      'UserType':['SUPERADMIN']
    });
  }

  async login(){
    await this.api.checkAuth(this.fg.value)
      .subscribe(res => {
        if(res.IsSuccess){
        this.router.navigate(['/members/']);
      }
      else{
        console.log('fail')
        this.toast.create(res.Message);
        console.log('fail')
      }
    }, (err) => {
      console.log(err);
      this.toast.create(err);
      });
  }

}
