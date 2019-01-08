import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-unapproved',
  templateUrl: './unapproved.component.html'
})
export class UnapprovedComponent implements OnInit {
  
  UnApprovedDoctorList:any

  constructor(
    public route: ActivatedRoute,
    public api: RestApiService,
    public loadingController: LoadingController
  ) { 
 
  }


  ngOnInit() {
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

}
