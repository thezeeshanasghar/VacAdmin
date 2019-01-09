import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BrandService } from '../services/brand.service';
import { VaccineService } from '../services/vaccine.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.page.html'
})
export class BrandPage implements OnInit {

  brands: any;

  constructor(
    public route: ActivatedRoute,
    public api: BrandService,
    public vaccineAPI: VaccineService,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.getDosses();
  }

  async getDosses() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.vaccineAPI.getBrandsByVaccineId(this.route.snapshot.paramMap.get('id')).subscribe(
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
