import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/rest-api.service';
import { LoadingController } from '@ionic/angular';
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
    public router: Router) { }

  ngOnInit() {
    this.getVaccine();
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
