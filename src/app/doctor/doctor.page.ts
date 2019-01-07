import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {

  whichdoctorlistshow = 'Approved';
  ApprovedDoctorList: any
  UnApprovedDoctorList:any
  constructor(
    public route: ActivatedRoute,
    public api: RestApiService,
    public loadingController: LoadingController
  ) { 
    this.Approved_doctor();
  }

  async Approved_doctor(){
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
  
      await loading.present();
  
      await this.api.getApprovedDoctorList().subscribe(
        res => {
          console.log(res);
          this.ApprovedDoctorList = res.ResponseData;
          loading.dismiss();
        }, 
        err => {
          console.log(err);
          loading.dismiss();
        }
      );
  }

  async UnApproved_doctor(){
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.getUnApprovedDoctorList().subscribe(
      res => {
        console.log(res);
        this.UnApprovedDoctorList = res.ResponseData;
        loading.dismiss();
      }, 
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
}
  ngOnInit() {
  }

}
