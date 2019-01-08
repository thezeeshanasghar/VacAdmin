import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/rest-api.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html'
})
export class DetailPage implements OnInit {

  vaccine: any = {};

  constructor(
    public api: RestApiService, 
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController) { }

  ngOnInit() {
    this.getVaccine();
  }


  async Deletevaccine() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async getVaccine() {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    await this.api.getVaccineById(this.route.snapshot.paramMap.get('id')).subscribe(
      res=>{
        console.log(res);
        this.vaccine = res.ResponseData;
        loading.dismiss();
      },
      err=>{
        console.log(err);
        loading.dismiss();
      }
    );
  }
}
