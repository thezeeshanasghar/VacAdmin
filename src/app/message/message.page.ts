import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  message: any = {};
  constructor(
    public route: ActivatedRoute,
    public api: RestApiService,
    public loadingController: LoadingController
  ) { }

  async getmsg(){
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.getMsg().subscribe(
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
