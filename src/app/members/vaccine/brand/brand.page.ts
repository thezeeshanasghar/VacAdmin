import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
import { VaccineService } from 'src/app/services/vaccine.service';
import { AlertService } from 'src/app/shared/alert.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.page.html',
  styleUrls: ['./brand.page.scss'],
})
export class BrandPage implements OnInit {

  brands: any;
  singlebrands: any;
  Name: any;
  
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public api: BrandService,
    public vaccineAPI: VaccineService,
    private alertService: AlertService,
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
        this.singlebrands = res.ResponseData;
        loading.dismiss();
        this.alertMsgForEdit(this.singlebrands.Name, id)
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
    let userData1 = { "Name": this.Name, "VaccineID": this.route.snapshot.paramMap.get('id') }
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
  async alertMsgForEdit(brandname, id) {
    //this.getBrandsbyId(id)
    const alert = await this.alertController.create({
      header: 'Edit Name',
      inputs: [
        {
          name: 'BrandName',
          value: brandname,
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
  alertDeletevaccine(id) {
    this.alertService.confirmAlert('Are you sure you want to delete this ?', null)
      .then((yes) => {
        if (yes) {
          this.Deletevacc(id);
        }
      });

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
