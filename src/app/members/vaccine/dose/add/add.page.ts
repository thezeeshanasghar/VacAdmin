import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { DoseService } from 'src/app/services/dose.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  fg: FormGroup;
  vaccineid: any;
  constructor(
    public api: DoseService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
  ) {
  }

  ngOnInit() {

    this.vaccineid = this.route.snapshot.paramMap.get('id');
    this.fg = this.formBuilder.group({
      'Name': [null, Validators.required],
      'MinAge': ['0', Validators.required],
      'MaxAge': [null],
      'MinGap': [null],
      'DoseOrder': [null],
      'VaccineID': [this.route.snapshot.paramMap.get('id')]
    });
  }

  async addDose() {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();

    await this.api.addDose(this.fg.value)
      .subscribe(res => {
        if (res.IsSuccess) {
          loading.dismiss();
          this.toastService.create('Dose added successfully.')
          this.router.navigateByUrl('/members/vaccine/' + this.route.snapshot.paramMap.get('id') + '/doses');
        }
        else
          this.toastService.create(res.message, 'danger');

      }, (err) => {
        console.error(err);
        this.toastService.create(err), 'danger';
      });
  }

}
