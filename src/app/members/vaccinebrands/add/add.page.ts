import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import { ToastService } from 'src/app/shared/toast.service';
import { VaccineService } from 'src/app/services/vaccine.service';
import { vaccineBrandsService } from 'src/app/services/vaccinebrands.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  // userData = { VaccineName: "", MinAge: "", MaxAge: "" };

  fg: FormGroup;
  data: any[];
  branddata: any[] = [];
  vaccinedata: any[] = [];

  constructor(
    public api: BrandService,
    public toast: ToastService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    public vaccineapi: VaccineService,
    public vaccinebrandsAPI: vaccineBrandsService
  ) { }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      // 'Name': [null, Validators.required],
      // 'MinAge': ['0', Validators.required],
      // 'MaxAge': [null],
      // 'isInfinite': [false],
      // 'Validity': [null],
      'BrandId': [null, Validators.required],
      'VaccineId': [null, Validators.required],
    });
this.brands();
    this.vaccines();
  }

  // function that gets called on value change of checkbox
  changeInfiniteValue() {
    // console.log(this.fg.value.isInfinite);

  }

  async brands() {
    
const loading = await this.loadingController.create({
        message: 'Get Brands...'
      });
      await loading.present();
      await this.api.getBrands().subscribe(
        res => {
          console.log(res);
          this.branddata = res.ResponseData;
          console.log(this.branddata);
          loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async vaccines() {
    const loading = await this.loadingController.create({
      message: 'Get Vaccines...'
    });
    await loading.present();
    await this.vaccineapi.getVaccines().subscribe(
      res => {
        console.log(res);
        this.vaccinedata = res.ResponseData;
        console.log(this.vaccinedata);
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async addVaccine() {
    try {
      const loading = await this.loadingController.create({
        message: 'Adding vaccine Brands...'
      });
      await loading.present();
      const response = await this.vaccinebrandsAPI.addVaccineBrands(this.fg.value).toPromise();
      await loading.dismiss();
      if (response) {
        await this.toast.create('VaccineBrands added successfully');
        await this.router.navigate(['/members/vaccineBrands']);
      } else {
        await this.toast.create(response.message || 'Failed to add vaccine Brands');
      }
    } catch (error) {
      console.error('Error adding vaccine Brands:', error);
      await this.loadingController.dismiss();
      await this.toast.create(error.message || 'An unexpected error occurred');
    }
  }
}
