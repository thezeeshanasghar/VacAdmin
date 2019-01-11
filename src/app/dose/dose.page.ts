import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DoseService } from '../services/dose.service';
import { VaccineService } from '../services/vaccine.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dose',
  templateUrl: './dose.page.html'
})
export class DosePage implements OnInit {

  dosses: any;
  vaccineid:any;

  constructor(
    public route: ActivatedRoute,
    public api: DoseService,
    public vaccineAPI: VaccineService,
    public loadingController: LoadingController,
    private storage: Storage) { }

  ngOnInit() {
    this.storage.get('VaccineID').then((val) => {
      this.vaccineid = val;
    });
    this.getDosses();
  }

  async getDosses() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.vaccineAPI.getDosesByVaccineId(this.route.snapshot.paramMap.get('id')).subscribe(
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
