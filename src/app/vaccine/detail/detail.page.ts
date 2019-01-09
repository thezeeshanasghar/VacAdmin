import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccineService } from 'src/app/services/vaccine.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html'
})
export class DetailPage implements OnInit {

  vaccine: any = {};
  error: any ;
  constructor(
    public api: VaccineService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController) { }

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
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  // Alert Msg Show for deletion of vaccine
  async AlertDeletevaccine() {
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
                this.Deletevacc();
                this.router.navigate(['/vaccine/']);
           }
        }
      ]
    });
    await alert.present();
  }

  // Alert Msg show if vaccine is not delete because some reason
  async ErrorMsgShowvaccineNotDel() {
    const alert = await this.alertController.create({
      message: this.error,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Call api to delete a vaccine 
  async Deletevacc() {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    await this.api.DeleteVaccine(this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        console.log(res)
        this.error = res.Message;
        if(this.error != null){
        this.ErrorMsgShowvaccineNotDel();
        loading.dismiss();}
        this.router.navigate(['/vaccine/']);
        loading.dismiss();
      },
      err => {
        console.log(err);
        console.log("error")
        loading.dismiss();
      }
    );
  }

}
