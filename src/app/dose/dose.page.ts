import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dose',
  templateUrl: './dose.page.html'
})
export class DosePage implements OnInit {

  dosses: any;

  constructor(
    public route: ActivatedRoute,
    public api: RestApiService,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.getDosses();
  }

  async getDosses() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.getDoses(this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        console.log(res);
        this.dosses = res.ResponseData;
        loading.dismiss();
      }, 
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
}
