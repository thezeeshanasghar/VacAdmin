import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { BrandService } from '../services/brand.service';
import { VaccineService } from '../services/vaccine.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.page.html'
})
export class BrandPage implements OnInit {

  brands: any;
  singlebrands: any;
  vaccineid:any;
  brandsname: any;
  Name: any;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public api: BrandService,
    public vaccineAPI: VaccineService,
    public loadingController: LoadingController,
    private alertController: AlertController,
    private storage: Storage) { }

  ngOnInit() {

    this.storage.get('VaccineID').then((val) => {
      this.vaccineid = val;
    });
    this.getBrands();
  }

  // Get all brands base on vaccine id
  async getBrands() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.vaccineAPI.getBrandsByVaccineId(this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        console.log(res);
        this.brands = res.ResponseData;
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  // Get single brand data base on brand id
  async getBrandsbyId(id) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.getBrandById(id).subscribe(
      res => {
        console.log(res);
        this.singlebrands = res.ResponseData;
        this.brandsname = res.ResponseData.Name;
        console.log(this.brandsname);
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  // AlertMsg Show for Add Brand Name
  async alertMsgForAdd() {
    const alert = await this.alertController.create({
      header: 'Add New',
      inputs: [
        {
          name: 'BrandName',
          type: 'text',
          placeholder: 'Brand Name',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Add',
          handler: (data) => {
            this.Name = data.BrandName;
            this.AddBrand();
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  // Request send to sever for Add a brand
  async AddBrand() {
    let userData1 = { "Name": this.Name, "VaccineID": this.vaccineid }
    console.log(userData1)
    await this.api.addBrand(this.route.snapshot.paramMap.get('id'), userData1)
      .subscribe(res => {
        console.log('done');
        this.router.navigate(['/vaccine/']);
      }, (err) => {
        console.log(err);
      });
  }

  // AlertMsg Show for Edit Brand Name
  async alertMsgForEdit(id) {
    this.getBrandsbyId(id)
    const alert = await this.alertController.create({
      header: 'Edit Name',
      inputs: [
        {
          name: 'BrandName',
          // type: 'text',
          value: this.brandsname,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Update',
          handler: (data) => {
            this.Name = data.BrandName;
            this.editBrand(id);
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  // Request send to sever update a brand name
  async editBrand(id) {
    let userData = { "ID": this.singlebrands.ID, "Name": this.Name, "VaccineID": this.singlebrands.VaccineID };
    console.log(userData)
    await this.api.editBrand(id, userData)
      .subscribe(res => {
        console.log('done');
        this.router.navigate(['/vaccine/']);
      }, (err) => {
        console.log(err);
      });
  }

  // Alert Msg Show for deletion of Brand
  async alertDeletevaccine(id) {
    const alert = await this.alertController.create({
      header: 'vaccs.io says',
      message: 'Are you sure want to delete this Record?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {
            this.Deletevacc(id);
            this.router.navigate(['/vaccine/']);
          }
        }
      ]
    });
    await alert.present();
  }

  // Call api to delete a vaccine 
  async Deletevacc(id) {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    await this.api.deleteBrand(id).subscribe(
      res => {
        console.log(res)
        loading.dismiss();
      },
      err => {
        console.log(err);
        console.log("error")
        loading.dismiss();
      }
    );
  }
}
