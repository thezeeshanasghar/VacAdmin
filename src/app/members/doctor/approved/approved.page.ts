import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
//import { LoadingController, Events } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { ToastService } from 'src/app/shared/toast.service';

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
  //  private events: Events,
    private toastService: ToastService
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

        // loop through all date and convert date from 23-12-2012 fomrat to 2012-12-23 format
        this.doctors.forEach(doc => {
          doc.ValidUpto = moment(doc.ValidUpto, "DD-MM-YYYY").format('YYYY-MM-DD')
        });
        // publish doctors count to update tab's badge in parent page/component
      //  this.events.publish('approvedCount', this.doctors.length);

        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }


  async updateValidity($event, docID) {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();

    let newDate = $event.detail.value;
    newDate = moment(newDate, 'YYYY-MM-DD').format('DD-MM-YYYY');

    this.api.changeValidity(newDate, docID).subscribe(
      res => {
        if (res.IsSuccess)
          this.toastService.create('Doctor\'s validity change successfully.');
        else
          this.toastService.create(res.Message, 'danger');

        loading.dismiss();
      },
      err => {
        this.toastService.create(err, 'danger');
        loading.dismiss();
      }
    );

  }
}
