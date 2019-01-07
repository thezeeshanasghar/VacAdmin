import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/rest-api.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  message:any = {};
  constructor(
    public api: RestApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
  ) { 
    this.getMsg();
  }

  async getMsg() {
    const loading = await this.loadingController.create({
      message: "Loading"
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
    this.getMsg();
  }

}
