import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html'
})
export class VaccinePage implements OnInit {

  vaccines: any;

  constructor(public api: RestApiService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.getVaccines();
  }

  async getVaccines() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.getVaccines().subscribe(
      res => {
        console.log(res);
        this.vaccines = res.ResponseData;
        loading.dismiss();
      }, 
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

}
