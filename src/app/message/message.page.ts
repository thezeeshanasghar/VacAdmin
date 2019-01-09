import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html'
})
export class MessagePage implements OnInit {

  message: any;

  constructor(
    public route: ActivatedRoute,
    public api: MessageService,
    public loadingController: LoadingController
  ) { }

  async getmsg(){
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
  ngOnInit() {
    this.getmsg();
  }

}
