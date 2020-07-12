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
      'MaxAge': [null]
    });
  }

  async addVaccine() {
    await this.api.addVaccine(this.fg.value)
      .subscribe(res => {
        if (res.IsSuccess)
        //  this.router.navigateByUrl('/members/vaccine');
          this.router.navigate(['/members/vaccine']);
        else
          this.toast.create(res.message);

      }, (err) => {
        console.log(err);
        this.toast.create(err);
      });
  }

}
