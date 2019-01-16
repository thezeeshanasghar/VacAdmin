import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { VaccineService } from '../services/vaccine.service';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html'
})
export class VaccinePage implements OnInit {

  vaccines: any;
  backupdoctorData: any;

  constructor(
    public api: VaccineService,
    public loadingController: LoadingController,
    private storage: Storage,
    private network: Network
  ) {
    
  }

  ngOnInit() {

    // this.checkNetworkStatus();


    this.getVaccines();
    // this.storage.get('vaccinedata').then((val) => {
    //   this.vaccines = val;
    // });
  }

  checkNetworkStatus(){
    console.log("yes")
    // watch network for a disconnection
    this.network.onDisconnect().subscribe(data => {
      console.log("network was disconnected");
      console.log(data);
    });
    // watch network for a connection
    this.network.onConnect().subscribe(data => {
      console.log("network was disconnected");
      console.log(data);
    });

  }

  async getVaccines() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.getVaccines().subscribe(
      res => {
        console.log(res);
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
