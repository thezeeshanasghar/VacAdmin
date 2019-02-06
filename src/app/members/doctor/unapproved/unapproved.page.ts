import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { LoadingController, Events } from '@ionic/angular';

@Component({
  selector: 'app-unapproved',
  templateUrl: './unapproved.page.html',
  styleUrls: ['./unapproved.page.scss'],
})
export class UnapprovedPage implements OnInit {

  doctors:any

  constructor(
    public route: ActivatedRoute,
    public api: DoctorService,
    public loadingController: LoadingController,
    public events: Events
  ) { }


  ngOnInit() {
    this.getUnApprovedDoctors();
  }
  
  async getUnApprovedDoctors(){
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.getUnApprovedDoctors().subscribe(
      res => {
        console.log(res);
        this.doctors = res.ResponseData;
        this.events.publish('unapprovedCount', this.doctors.length);
        loading.dismiss();
      }, 
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
}

}
