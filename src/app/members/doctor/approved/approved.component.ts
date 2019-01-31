import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styles:[
    '.ion-page { display: inherit }'
  ]
})
export class ApprovedComponent implements OnInit {
  
  doctors: any

  constructor(
    public route: ActivatedRoute,
    public api: DoctorService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getApprovedDoctors();
  }
  
  async getApprovedDoctors(){
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.getApprovedDoctors().subscribe(
      res => {
        console.log(res);
        this.doctors = res.ResponseData;
        loading.dismiss();
      }, 
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
}


}
