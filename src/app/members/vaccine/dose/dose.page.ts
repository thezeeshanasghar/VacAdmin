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
export class DosePage implements OnInit {

  dosses: any;
  vaccineID: any;

  constructor(
    public route: ActivatedRoute,
    public api: DoseService,
    public vaccineAPI: VaccineService,
    public loadingController: LoadingController,
    public router: Router,
    public toast: ToastService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getDosses();
    this.vaccineID = this.route.snapshot.paramMap.get('id');
  }

  // Get all dosses base on vaccineID from server
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

  alertDeleteDose(id) {
    this.alertService.confirmAlert('Are you sure you want to delete this ?', null)
      .then((yes) => {
        if (yes) {
          this.deleteDose(id);
        }
      });

  }

  // Call api to delete a vaccine 
  async deleteDose(id) {
    const loading = await this.loadingController.create({
      message: "Deleting"
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
        this.toast.create(err);
        loading.dismiss();
      }
    );
  }
}
