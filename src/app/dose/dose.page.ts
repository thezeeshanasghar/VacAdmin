import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DoseService } from '../services/dose.service';
import { VaccineService } from '../services/vaccine.service';
import { Storage } from '@ionic/storage';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-dose',
  templateUrl: './dose.page.html'
})
export class DosePage implements OnInit {

  dosses: any;

  constructor(
    public route: ActivatedRoute,
    public api: DoseService,
    public vaccineAPI: VaccineService,
    public loadingController: LoadingController,
    public router: Router,
    public alertController: AlertController,
    public toast: ToastService
  ) { }

  ngOnInit() {
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

  // Alert Msg Show for deletion of Dose
  async alertDeletedose(id) {
    const alert = await this.alertController.create({
      header: 'vaccs.io says',
      message: 'Are you sure want to delete this Record?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteDose(id);
            this.router.navigateByUrl('/vaccine/' + this.route.snapshot.paramMap.get('id') + '/dose');
          }
        }
      ]
    });
    await alert.present();
  }

  // Call api to delete a vaccine 
  async deleteDose(id) {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    await this.api.deleteDose(id).subscribe(
      res => {
        console.log(res)
        if (!res.IsSuccess) {
          loading.dismiss();
        } else {
          this.router.navigateByUrl('/vaccine/' + this.route.snapshot.paramMap.get('id') + '/dose');
          loading.dismiss();
        }
      },
      err => {
        this.toast.presentToast(err);
        loading.dismiss();
      }
    );
  }
}
