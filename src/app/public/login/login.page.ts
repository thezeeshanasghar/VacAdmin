import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/shared/toast.service';
import { AlertController } from '@ionic/angular';


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
    private api: LoginService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {

    this.api.changeState(false);
    this.fg = this.formBuilder.group({
      'MobileNumber': [null, Validators.required],
      'Password': [null, Validators.required],
      'CountryCode': ['92'],
      'UserType': ['SUPERADMIN']
    });
  }

  async login() {
    await this.api.checkAuth(this.fg.value)
      .subscribe(res => {
        if (res.IsSuccess) {
          this.api.changeState(true);
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
    await this.api.forgotPassword(data)
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
