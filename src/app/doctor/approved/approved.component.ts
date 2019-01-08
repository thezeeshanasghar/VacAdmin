import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { LoadingController } from '@ionic/angular';

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
    public api: RestApiService,
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
