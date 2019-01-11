import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { DoseService } from 'src/app/services/dose.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  fg: FormGroup;
  constructor(
    public api: DoseService,
    public toaster: ToastService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    // this.getClassroom(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
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
    await this.api.addDose(this.fg.value)
      .subscribe(res => {
        if (res.IsSuccess)
          this.router.navigateByUrl('/vaccine/' + this.route.snapshot.paramMap.get('id') + '/dose');
        else
          this.toaster.presentToast(res.message);
      }, (err) => {
        console.log(err);
        this.toaster.presentToast(err);
      });
  }

}
