import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { VaccineService } from 'src/app/services/vaccine.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  // userData = { VaccineName: "", MinAge: "", MaxAge: "" };

  fg: FormGroup;

  constructor(
    public api: VaccineService,
    public toast: ToastService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      'Name': [null, Validators.required],
      'MinAge': ['0', Validators.required],
      'MaxAge': [null],
      'isInfinite': [false],
      'Validity': [null, Validators.required],
    });

  }

  // function that gets called on value change of checkbox
  changeInfiniteValue() {
    // console.log(this.fg.value.isInfinite);

  }

  async addVaccine() {
    try {
      const loading = await this.loadingController.create({
        message: 'Adding vaccine...'
      });
      await loading.present();
      const response = await this.api.addVaccine(this.fg.value).toPromise();
      // console.log('addVaccine response:', response);
      await loading.dismiss();
  // console.log('addVaccine response:', response.IsSuccess);
      if (response.IsSuccess) {
        await this.toast.create('Vaccine added successfully');
        await this.router.navigate(['/members/vaccine']);
      } else {
        await this.toast.create(response.message || 'Failed to add vaccine');
      }
    } catch (error) {
      console.error('Error adding vaccine:', error);
      await this.loadingController.dismiss();
      await this.toast.create(error.message || 'An unexpected error occurred');
    }
  }

}
