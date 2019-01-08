import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-unapproved',
  templateUrl: './unapproved.component.html'
})
export class UnapprovedComponent implements OnInit {
  
  doctors:any

  constructor(
    public route: ActivatedRoute,
    public api: RestApiService,
    public loadingController: LoadingController
  ) { 
 
  }


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
        loading.dismiss();
      }, 
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
}

}
