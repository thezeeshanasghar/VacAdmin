import { Component, OnInit } from '@angular/core';
import { VaccineInfoService } from 'src/app/services/vaccine-info.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertService } from 'src/app/shared/alert.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-vaccine-info',
  templateUrl: './vaccine-info.page.html',
  styleUrls: ['./vaccine-info.page.scss'],
})
export class VaccineInfoPage implements OnInit {

  vaccineInfos: any[] = [];
  backupVaccineInfos: any;

  constructor(
    public api: VaccineInfoService,
    public route: ActivatedRoute,
    public router: Router,
    public loadingController: LoadingController,
    private alertService: AlertService,
    private toastService: ToastService,
  ) { }

  ionViewWillEnter() {
    this.getVaccineInfos();
  }

  ngOnInit() {
  }

  async getVaccineInfos() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.getVaccineInfos().subscribe(
      res => {
        this.vaccineInfos = (res.ResponseData || []).sort((a: any, b: any) =>
          (a.Name || '').localeCompare(b.Name || '')
        );
        this.backupVaccineInfos = this.vaccineInfos;
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async promptForDeleteVaccineInfo(id) {
    this.alertService.confirmAlert('Are you sure you want to delete this ?', null)
      .then(async (yes) => {
        if (yes) {
          await this.deleteVaccineInfo(id);
          this.getVaccineInfos();
        }
      });
  }

  async deleteVaccineInfo(id) {
    const loading = await this.loadingController.create({
      message: 'Deleting'
    });
    await loading.present();
    await this.api.deleteVaccineInfo(id).subscribe(
      res => {
        if (!res.IsSuccess) {
          this.alertService.simpleAlert(res.Message);
          loading.dismiss();
        } else {
          this.router.navigate(['/members/vaccine-info']);
          loading.dismiss();
        }
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  onInput(ev) {
    var val = ev.target.value;

    if (val && val.trim() != '') {
      this.vaccineInfos = this.backupVaccineInfos.filter(
        (item) => {
          return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1)
        }
      )
    }
    if (val.trim() == '') {
      this.vaccineInfos = this.backupVaccineInfos;
    }
  }

}
