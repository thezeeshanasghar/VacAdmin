import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { LoadingController, Events } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.page.html',
  styleUrls: ['./approved.page.scss'],
})
export class ApprovedPage implements OnInit {

  doctors: any
  today: any;

  constructor(
    public route: ActivatedRoute,
    public api: DoctorService,
    public loadingController: LoadingController,
    private events: Events
  ) { 
    this.today = moment().format('YYYY-MM-DD');
  }

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
        this.doctors.forEach(doc => {
          doc.ValidUpto = moment(doc.ValidUpto, "DD-MM-YYYY").format('YYYY-MM-DD')
        });
        console.log(this.doctors[0].ValidUpto);
        
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
