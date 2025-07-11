import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DoseService } from 'src/app/services/dose.service';
import { VaccineService } from 'src/app/services/vaccine.service';
import { ToastService } from 'src/app/shared/toast.service';
import { AlertService } from 'src/app/shared/alert.service';
@Component({
  selector: 'app-dose',
  templateUrl: './dose.page.html'
})
export class DosePage {
  dosses: any;
  vaccineId: any;
  Note: any;
  hide: any;
  constructor(
    public route: ActivatedRoute,
    public api: DoseService,
    public vaccineAPI: VaccineService,
    public loadingController: LoadingController,
    public router: Router,
    public toast: ToastService,
    private alertService: AlertService,
  ) {
    this.hide = false;
  }

  ionViewWillEnter() {
    this.vaccineId = this.route.snapshot.paramMap.get('id');
    this.getDosses();
  }

  async getDosses() {
    const loading = await this.loadingController.create({
      message: 'Loading Dosses'
    });
    await loading.present();
    await this.vaccineAPI.getDosesByVaccineId(this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        if (res.IsSuccess) {
          this.dosses = res.ResponseData;
          console.log(this.dosses);
          if (this.dosses.length > 0) {
            if (this.dosses[0].Vaccine.isInfinite) {
              this.hide = true;
            }
          }
          loading.dismiss();
        } else {
          this.toast.create('Error: failed to get any doses');
          loading.dismiss();
        }
      },
      err => {
        console.log(err);
        this.toast.create('Error: server failure');
        loading.dismiss();
      }
    );
  }

  alertDeleteDose(id) {
    this.alertService.confirmAlert('Are you sure you want to delete this ?', null)
      .then(async (yes) => {
        if (yes) {
          await this.deleteDose(id);
          this.getDosses();
        }
      });

  }

  async deleteDose(id) {
    const loading = await this.loadingController.create({
      message: "Deleting"
    });
    await loading.present();
    await this.api.deleteDose(id).subscribe(
      res => {
        if (!res.IsSuccess) {
          loading.dismiss();
        } else {
          this.router.navigateByUrl('members/vaccine/' + this.vaccineId + '/doses');
          loading.dismiss();
        }
      },
      err => {
        this.toast.create(err);
        loading.dismiss();
      }
    );
  }
}
