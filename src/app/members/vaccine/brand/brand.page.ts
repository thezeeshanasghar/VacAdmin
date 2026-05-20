import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
import { AlertService } from 'src/app/shared/alert.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/shared/toast.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.page.html',
  styleUrls: ['./brand.page.scss'],
})
export class BrandPage {

  brands: any;
  singlebrands: any;
  Name: any;
  Manufacturer: any;
  MinAge: any;

  minAgeOptions = [
    { label: 'No Restriction', value: null },
    { label: 'At Birth', value: 0 },
    { label: '1 Day', value: 1 },
    { label: '2 Days', value: 2 },
    { label: '3 Days', value: 3 },
    { label: '4 Days', value: 4 },
    { label: '5 Days', value: 5 },
    { label: '6 Days', value: 6 },
    { label: '8 Days', value: 8 },
    { label: '15 Days', value: 15 },
    { label: '29 Days', value: 29 },
    { label: '1 Week', value: 7 },
    { label: '2 Weeks', value: 14 },
    { label: '3 Weeks', value: 21 },
    { label: '4 Weeks', value: 28 },
    { label: '5 Weeks', value: 35 },
    { label: '6 Weeks', value: 42 },
    { label: '7 Weeks', value: 49 },
    { label: '8 Weeks', value: 56 },
    { label: '9 Weeks', value: 63 },
    { label: '10 Weeks', value: 70 },
    { label: '11 Weeks', value: 77 },
    { label: '12 Weeks', value: 84 },
    { label: '13 Weeks', value: 91 },
    { label: '14 Weeks', value: 98 },
    { label: '15 Weeks', value: 105 },
    { label: '15 Weeks + 6 Days', value: 111 },
    { label: '16 Weeks', value: 112 },
    { label: '17 Weeks', value: 119 },
    { label: '18 Weeks', value: 126 },
    { label: '19 Weeks', value: 133 },
    { label: '20 Weeks', value: 140 },
    { label: '21 Weeks', value: 147 },
    { label: '22 Weeks', value: 154 },
    { label: '23 Weeks', value: 161 },
    { label: '24 Weeks', value: 168 },
    { label: '1 Month', value: 401 },
    { label: '2 Months', value: 402 },
    { label: '3 Months', value: 403 },
    { label: '4 Months', value: 404 },
    { label: '5 Months', value: 405 },
    { label: '6 Months', value: 406 },
    { label: '7 Months', value: 407 },
    { label: '8 Months', value: 408 },
    { label: '9 Months', value: 409 },
    { label: '10 Months', value: 410 },
    { label: '11 Months', value: 411 },
    { label: '12 Months', value: 412 },
    { label: '13 Months', value: 413 },
    { label: '14 Months', value: 414 },
    { label: '15 Months', value: 415 },
    { label: '16 Months', value: 416 },
    { label: '17 Months', value: 417 },
    { label: '18 Months', value: 418 },
    { label: '24 Months', value: 424 },
    { label: '1 Year', value: 3001 },
    { label: '2 Years', value: 3002 },
    { label: '3 Years', value: 3003 },
    { label: '4 Years', value: 3004 },
    { label: '5 Years', value: 3005 },
    { label: '6 Years', value: 3006 },
    { label: '7 Years', value: 3007 },
    { label: '8 Years', value: 3008 },
    { label: '9 Years', value: 3009 },
    { label: '10 Years', value: 3010 },
    { label: '11 Years', value: 3011 },
    { label: '12 Years', value: 3012 },
    { label: '13 Years', value: 3013 },
    { label: '14 Years', value: 3014 },
    { label: '15 Years', value: 3015 },
    { label: '16 Years', value: 3016 },
    { label: '17 Years', value: 3017 },
    { label: '18 Years', value: 3018 },
    { label: '19 Years', value: 3019 },
    { label: '20 Years', value: 3020 },
  ];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public api: BrandService,
    private alertService: AlertService,
    public loadingController: LoadingController,
    private toastservice: ToastService,
    private alertController: AlertController) { }

  ionViewWillEnter() {
    this.getBrands();
  }

  async getBrands() {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();
    await this.api.getBrands().subscribe(
      res => {
        this.brands = (res.ResponseData || []).sort((a, b) =>
          (a.Name || '').toLowerCase().localeCompare((b.Name || '').toLowerCase())
        );
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async getBrandsbyId(id) {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();
    await this.api.getBrandById(id).subscribe(
      res => {
        this.singlebrands = res.ResponseData;
        loading.dismiss();
        this.alertMsgForEdit(this.singlebrands.Name, this.singlebrands.Manufacturer, this.singlebrands.MinAge, id);
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async alertMsgForAdd() {
    const alert = await this.alertController.create({
      header: 'Add New',
      inputs: [
        { name: 'BrandName', type: 'text', placeholder: 'Brand Name' },
        { name: 'Manufacturer', type: 'text', placeholder: 'Manufacturer' },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Next',
          handler: (data) => {
            this.Name = data.BrandName;
            this.Manufacturer = data.Manufacturer;
            this.showMinAgeAlert(null, () => this.AddBrand());
          }
        }
      ]
    });
    await alert.present();
  }

  async showMinAgeAlert(currentValue: any, onConfirm: () => void) {
    const inputs = this.minAgeOptions.map(opt => ({
      type: 'radio' as const,
      label: opt.label,
      value: opt.value,
      checked: opt.value === currentValue || (opt.value === null && currentValue == null)
    }));

    const alert = await this.alertController.create({
      header: 'Min Age for Brand',
      inputs,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Confirm',
          handler: (data) => {
            this.MinAge = data;
            onConfirm();
          }
        }
      ]
    });
    await alert.present();
  }

  async AddBrand() {
    let userData1 = { Name: this.Name, Manufacturer: this.Manufacturer, MinAge: this.MinAge };
    await this.api.addBrand(userData1).subscribe(
      res => { this.getBrands(); },
      err => { console.log(err); }
    );
  }

  async alertMsgForEdit(brandname, manufacturer, minAge, id) {
    const alert = await this.alertController.create({
      header: 'Edit Brand',
      inputs: [
        { name: 'BrandName', type: 'text', placeholder: 'Brand Name', value: brandname },
        { name: 'Manufacturer', type: 'text', placeholder: 'Manufacturer', value: manufacturer },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'secondary' },
        {
          text: 'Next',
          handler: (data) => {
            this.Name = data.BrandName;
            this.Manufacturer = data.Manufacturer;
            this.showMinAgeAlert(minAge, () => this.editBrand(id));
          }
        }
      ]
    });
    await alert.present();
  }

  async editBrand(id) {
    let userData = { ID: this.singlebrands.ID, Name: this.Name, Manufacturer: this.Manufacturer, MinAge: this.MinAge };
    await this.api.editBrand(id, userData).subscribe(
      res => { this.getBrands(); },
      err => { console.log(err); }
    );
  }

  alertDeletevaccine(id) {
    this.alertService.confirmAlert('Are you sure you want to delete this ?', null)
      .then((yes) => {
        if (yes) { this.Deletevacc(id); }
      });
  }

  async Deletevacc(id) {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();
    await this.api.deleteBrand(id).subscribe(
      res => {
        if (res.IsSuccess == true) { this.getBrands(); loading.dismiss(); }
        else { loading.dismiss(); this.toastservice.create(res.Message); }
      },
      err => { loading.dismiss(); this.toastservice.create(err); }
    );
  }
}
