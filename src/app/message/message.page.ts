import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MessageService } from '../services/message.service';
import { VaccineService } from '../services/vaccine.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../shared/toast.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss']
})
export class MessagePage implements OnInit {

  fg: FormGroup;
  message: any;
  section = false;

  constructor(
    public route: ActivatedRoute,
    public api: MessageService,
    public vaccineAPI: VaccineService,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast:ToastService
  ) {
  }
  ngOnInit() {
    this.fg = this.formBuilder.group({
      'MobileNumber': [null, Validators.required],
      'SMS': [null, Validators.required]
    });
    this.getmsg();
  }


  async getmsg() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.getMessages().subscribe(
      res => {
        console.log(res);
        this.message = res.ResponseData;
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async sendMsg() {
    await this.api.sendMsg(this.fg.value)
      .subscribe(res => {
        if (res.IsSuccess)
          this.router.navigateByUrl('/message/');
      }, (err) => {
        console.log(err);
        this.toast.create(err);
      });
  }

  accordion() {
    if (this.section == true) {
      this.section = false
    }
    else {
      this.section = true
    }
  }


}
