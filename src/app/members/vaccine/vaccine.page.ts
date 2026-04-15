import { Component, OnInit } from '@angular/core';
import { VaccineService } from 'src/app/services/vaccine.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertService } from 'src/app/shared/alert.service';
import { ToastService } from 'src/app/shared/toast.service';
import { vaccineBrandsService } from 'src/app/services/vaccinebrands.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html',
  styleUrls: ['./vaccine.page.scss'],
})
export class VaccinePage implements OnInit {

  vaccines: any[] = [];
  backupdoctorData: any;
  suggestedBrandCountByVaccineId: { [vaccineId: number]: number } = {};

  constructor(
    public api: VaccineService,
    public route: ActivatedRoute,
    public router: Router,
    public loadingController: LoadingController,
    private alertService: AlertService,
    private toastService: ToastService,
    private vaccineBrandsApi: vaccineBrandsService,
  ) {
    // route.params.subscribe(val => {
    //   this.getVaccines();
    // });
  }

  ionViewWillEnter() {
    this.getVaccines();
  }

  ngOnInit() {

  }

  async getVaccines() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.getVaccines().subscribe(
      res => {
        this.vaccines = res.ResponseData;
        this.loadSuggestedBrandCounts();
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  private loadSuggestedBrandCounts() {
    this.vaccineBrandsApi.getVaccineBrands().subscribe(
      (res) => {
        const rows = Array.isArray(res)
          ? res
          : ((res && res.ResponseData && Array.isArray(res.ResponseData)) ? res.ResponseData : []);

        const counts: { [vaccineId: number]: number } = {};
        (rows || []).forEach((item: any) => {
          const vaccineId = Number(item && item.VaccineId);
          if (!vaccineId || isNaN(vaccineId)) {
            return;
          }
          counts[vaccineId] = (counts[vaccineId] || 0) + 1;
        });

        this.suggestedBrandCountByVaccineId = counts;
      },
      (err) => {
        console.log(err);
        this.suggestedBrandCountByVaccineId = {};
      }
    );
  }

  // Alert Msg Show for deletion of vaccine
  async promptForDeleteVaccine(id) {
    this.alertService.confirmAlert('Are you sure you want to delete this ?', null)
      .then(async (yes) => {
        if (yes) {
          await this.deleteVaccine(id);
          this.getVaccines();
        }
      });
  }

  // Call api to delete a vaccine 
  async deleteVaccine(id) {
    const loading = await this.loadingController.create({
      message: "Deleting"
    });
    await loading.present();
    await this.api.deleteVaccine(id).subscribe(
      res => {
        if (!res.IsSuccess) {
          this.alertService.simpleAlert(res.Message);
          loading.dismiss();
        } else {
          this.router.navigate(['/members/vaccine']);
          loading.dismiss();
        }
      },
      err => {

        console.log(err);
        console.log("error")
        loading.dismiss();
      }
    );
  }

  onInput(ev) {

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.vaccines = this.vaccines.filter(
        (item) => {
          return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1)
        }
      )
    }
    if (val.trim() == "") {
      this.vaccines = this.backupdoctorData;
    }
  }

  addDoses(id) {
    var strRoute='/members/child/vaccine/' + id + '/doses/';
    console.log(strRoute);
    this.router.navigate([strRoute]);

  }


}
