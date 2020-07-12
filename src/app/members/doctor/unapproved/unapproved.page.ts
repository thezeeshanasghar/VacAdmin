import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
//import { LoadingController, Events } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/shared/toast.service';
import * as moment from 'moment';

@Component({
  selector: 'app-unapproved',
  templateUrl: './unapproved.page.html',
  styleUrls: ['./unapproved.page.scss'],
})
export class UnapprovedPage implements OnInit {

  doctors: any

  constructor(
    public route: ActivatedRoute,
    public api: DoctorService,
    public loadingController: LoadingController,
   // public events: Events,
    public toastService: ToastService
  ) { }


  ngOnInit() {
    this.getUnApprovedDoctors();
  }

  async getUnApprovedDoctors() {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();

    await this.api.getUnApprovedDoctors().subscribe(
      res => {
        console.log(res);
        this.doctors = res.ResponseData;
     //   this.events.publish('unapprovedCount', this.doctors.length);
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async onApprove(docId: number) {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();

    await this.api.approveDoctor(docId).subscribe(
      res => {
        if (res.IsSuccess)
          this.toastService.create('Doctor\'s approval request succeded');
        else
          this.toastService.create(res);

        loading.dismiss();
        this.getUnApprovedDoctors();
        this.getApprovedDoctors();
      },
      err => {
        this.toastService.create(err, 'danger');
        loading.dismiss();
      }
    );
  }

  async getApprovedDoctors() {
    await this.api.getApprovedDoctors().subscribe(
      res => {
        console.log(res);
        this.doctors = res.ResponseData;
        // loop through all date and convert date from 23-12-2012 fomrat to 2012-12-23 format
        this.doctors.forEach(doc => {
          doc.ValidUpto = moment(doc.ValidUpto, "DD-MM-YYYY").format('YYYY-MM-DD')
        });
        // publish doctors count to update tab's badge in parent page/component
       // this.events.publish('approvedCount', this.doctors.length);

      },
      err => {
        console.log(err);
      }
    );
  }

}
