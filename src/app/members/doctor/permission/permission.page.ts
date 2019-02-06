import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.page.html',
  styleUrls: ['./permission.page.scss'],
})
export class PermissionPage implements OnInit {

  doctor: any = {};
  response: any;

  constructor(
    public api: DoctorService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public toastService: ToastService,
  ) { }

  ngOnInit() {
    this.getDoctor();
  }

  async getDoctor() {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    await this.api.getDoctorById(this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        this.doctor = res.ResponseData;
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async update() {
    await this.api.updateDoctorPermission(this.route.snapshot.paramMap.get('id'), this.doctor)
      .subscribe(res => {
        this.toastService.create("Doctor's permissions are updated");
      }, (err) => {
        console.log(err);
        this.toastService.create(err, 'danger');
      });
  }

}
