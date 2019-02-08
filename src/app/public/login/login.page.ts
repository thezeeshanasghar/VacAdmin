import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/shared/toast.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {


  fg: FormGroup;
  constructor(
    public router: Router,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastService: ToastService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.skipLoginIfAlreadyLoggedIn();

    this.fg = this.formBuilder.group({
      'MobileNumber': [null, Validators.required],
      'Password': [null, Validators.required],
      'CountryCode': ['92'],
      'UserType': ['SUPERADMIN']
    });
  }

  skipLoginIfAlreadyLoggedIn() {
    this.storage.get(environment.IS_LOGGED_IN).then(value => {
      if (value) {
        this.loginService.changeState(value);
        this.router.navigate(['members/dashboard']);
      }
    });
  }

  async login() {
    await this.loginService.checkAuth(this.fg.value)
      .subscribe(res => {
        if (res.IsSuccess) {
          this.loginService.changeState(true);
          this.storage.set(environment.IS_LOGGED_IN, true);
          this.router.navigate(['/members/']);
        }
        else {
          this.toastService.create(res.Message, 'danger');
        }
      }, (err) => {
        console.log(err);
        this.toastService.create(err);
      });
  }

  // show Alert msg for forgot password
  async forgotPasswordAlert() {
    const alert = await this.alertController.create({
      header: 'Forgot Password',
      inputs: [
        {
          name: 'MobileNumber',
          type: 'text',
          placeholder: 'like 3211231231',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Send Email/SMS',
          handler: (data) => {
            this.forgotPassword(data.MobileNumber);
          }
        }
      ]
    });
    await alert.present();
  }

  // Call api to forgot password
  async forgotPassword(MobileNumber) {
    let data = { 'CountryCode': '92', 'UserType': 'SUPERADMIN', 'MobileNumber': MobileNumber }
    await this.loginService.forgotPassword(data)
      .subscribe(res => {
        if (res.IsSuccess) {
        }
        else {
          this.toastService.create(res.Message, 'danger');
        }
      }, (err) => {
        console.log(err);
        this.toastService.create(err, 'danger');
      });
  }
}
