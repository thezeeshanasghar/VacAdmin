import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.page.html'
})
export class BrandPage implements OnInit {

  brands: any;

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

    await this.api.getBrands(this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        console.log(res);
        this.brands = res.ResponseData;
        loading.dismiss();
      }, 
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

}
