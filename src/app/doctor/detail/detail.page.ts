import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  doctor: any = {};
  response:any;
  constructor(
    public api: RestApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    this.getVaccine();
  }

  async getVaccine() {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    await this.api.getDoctorById(this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        console.log(res);
        this.doctor = res.ResponseData;
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async update(){
    await this.api.updateDoctorPermission(this.route.snapshot.paramMap.get('id'), this.doctor)
    .subscribe(res => {
      console.log("Done")
        // let id = res['id'];
        // this.router.navigate(['/detail/'+id]);
      }, (err) => {
        console.log(err);
      });
  }

}
