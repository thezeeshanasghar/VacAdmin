import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { VaccineService } from '../services/vaccine.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html'
})
export class VaccinePage implements OnInit {

  vaccines: any;

  constructor(
    public api: VaccineService,
    public loadingController: LoadingController
  ) {
    this.getVaccines();
  }

  ngOnInit() {

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
