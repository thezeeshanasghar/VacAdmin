import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccineService } from 'src/app/services/vaccine.service';
import { Storage } from '@ionic/storage';
import { AlertService } from 'src/app/shared/alert.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html'
})
export class DetailPage implements OnInit {

  vaccine: any = {};
  error: any;
  constructor(
    public api: VaccineService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    private storage: Storage,
    private alertService: AlertService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getVaccine();
  }

  // Get Vaccine data from Server
  async getVaccine() {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    await this.api.getVaccineById(this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        console.log(res);
        this.vaccine = res.ResponseData;
        this.storage.set('VaccineID', this.vaccine.ID);
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  // Alert Msg Show for deletion of vaccine
  async promptForDeleteVaccine() {
    this.alertService.confirmAlert('Are you sure you want to delete this ?', null)
      .then((yes) => {
        if (yes) {
          this.toastService.create('Logged out of the application');
        }
      });
  }

  onOK() {
    this.deleteVaccine();
    this.router.navigate(['/vaccine']);
  }

  // Alert Msg show if vaccine is not delete because some reason
  async showErrorResponseFromAPI(messageStr) {
    const alert = await this.alertController.create({
      header: 'Error !',
      message: messageStr,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Call api to delete a vaccine 
  async deleteVaccine() {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    await this.api.deleteVaccine(this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        console.log(res)
        if (!res.IsSuccess) {
          this.showErrorResponseFromAPI(res.Message);
          loading.dismiss();
        } else {
          this.router.navigate(['/vaccine']);
          loading.dismiss();
        }
      },
      err => {
        // TODO: Faisal fix this error senario
        console.log(err);
        console.log("error")
        loading.dismiss();
      }
    );
  }

}
