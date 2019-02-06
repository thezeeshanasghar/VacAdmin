import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { LoadingController, Events } from '@ionic/angular';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.page.html',
  styleUrls: ['./approved.page.scss'],
})
export class ApprovedPage implements OnInit {

  doctors: any

  constructor(
    public route: ActivatedRoute,
    public api: DoctorService,
    public loadingController: LoadingController,
    private events: Events
  ) { }

  ngOnInit() {
    this.getApprovedDoctors();
  }

  async getApprovedDoctors() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.getApprovedDoctors().subscribe(
      res => {
        console.log(res);
        this.doctors = res.ResponseData;
        this.events.publish('approvedCount', this.doctors.length);
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }


}
