import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {

  constructor(private loginService: LoginService,private toastService: ToastService ) { }

  ngOnInit() {
  }



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


  validation_messages = {
  
    MobileNumber: [{ type: "required", message: "Mobile Number is required." },
          { type: "pattern", message: "Mobile Number is required like 3xxxxxxxx"}
  ],
  };
  
}
