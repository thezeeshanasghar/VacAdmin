import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { BrandService } from '../services/brand.service';
import { VaccineService } from '../services/vaccine.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.page.html'
})
export class BrandPage implements OnInit {

  brands: any;
  singlebrands:any
  brandsname: any;
  Name:any;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public api: BrandService,
    public vaccineAPI: VaccineService,
    public loadingController: LoadingController,
    private alertController: AlertController) { }

  ngOnInit() {
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

  // AlertMsg Show for Edit Brand Name
  async AlertMsgForEdit(id) {
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
    let userData = { "ID": this.singlebrands.ID, "Name":this.Name, "VaccineID": this.singlebrands.VaccineID };
    await this.api.EditBrand(id, userData)
      .subscribe(res => {
        console.log('done');
        this.router.navigate(['/vaccine/']);
      }, (err) => {
        console.log(err);
      });
  }

  // Alert Msg Show for deletion of Brand
  async AlertDeletevaccine(id) {
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
    await this.api.DeleteBrand(id).subscribe(
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
