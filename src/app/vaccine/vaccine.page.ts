import { Component, OnInit } from '@angular/core';
import { LoadingController, } from '@ionic/angular';
import { VaccineService } from '../services/vaccine.service';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { AlertService } from '../shared/alert.service';
import { ToastService } from '../shared/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html'
})
export class VaccinePage implements OnInit {

  vaccines: any;
  backupdoctorData: any;

  constructor(
    public api: VaccineService,
    public router: Router,
    public loadingController: LoadingController,
    private storage: Storage,
    private network: Network,
    private alertService: AlertService,
    private toastService: ToastService,
  ) {

  }

  ngOnInit() {

    // this.checkNetworkStatus();


    this.getVaccines();
    // this.storage.get('vaccinedata').then((val) => {
    //   this.vaccines = val;
    // });
  }

  checkNetworkStatus() {
    // watch network for a disconnection
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });

    // stop disconnect watch
    // disconnectSubscription.unsubscribe();


    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

  }

  async getVaccines() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.getVaccines().subscribe(
      res => {
        this.vaccines = res.ResponseData;
        this.storage.set('vaccinedata', this.vaccines);
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  // Alert Msg Show for deletion of vaccine
  async promptForDeleteVaccine(id) {
    this.alertService.confirmAlert('Are you sure you want to delete this ?', null)
      .then((yes) => {
        if (yes) {
          this.deleteVaccine(id)
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
          this.router.navigate(['/vaccine']);
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

}
