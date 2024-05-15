import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { DoseService } from 'src/app/services/dose.service';
import { VaccineService } from 'src/app/services/vaccine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  vaccine: any;
  fg: FormGroup;
  vaccineid: any;
  test:any = 5;
  constructor(
    public api: DoseService,
    public vaccineservice: VaccineService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
  ) {
  }

   async ngOnInit() {
    
    this.vaccineid = this.route.snapshot.paramMap.get('id');
    this.fg = this.formBuilder.group({
      'Name': [null, Validators.required],
      'MinAge': ['0', Validators.required],
      'MaxAge': [null],
      'MinGap': [null],
      DoseOrder: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Add DoseOrder control
      'VaccineId': [this.vaccineid],
    });
    await this.getSingleVaccine();
    // console.log(this.vaccine);
    // console.log(this.test);
  }
  // ionViewWillEnter()
  // {
  //   // this.vaccineid = this.route.snapshot.paramMap.get('id');
  //   // this.fg = this.formBuilder.group({
  //   //   'Name': [null, Validators.required],
  //   //   'MinAge': ['0', Validators.required],
  //   //   'MaxAge': [null],
  //   //   'MinGap': [null],
  //   //   'DoseOrder': [null],
  //   //   'VaccineId': [this.vaccineid]
  //   // });
  //   this.getSingleVaccine();
  // }

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

  async getSingleVaccine() {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    await this.vaccineservice.getVaccineById(this.vaccineid).subscribe(
      res=>{
        this.vaccine = res.ResponseData;
        // console.log(this.vaccine);
        loading.dismiss();
        this.fg.controls['MinAge'].setValue(this.vaccine.MinAge+'');
        if(this.vaccine.MaxAge)
        this.fg.controls['MaxAge'].setValue(this.vaccine.MaxAge+'');
      },
      err=>{
        console.log(err);
        loading.dismiss();
      }
    );
  }

}
