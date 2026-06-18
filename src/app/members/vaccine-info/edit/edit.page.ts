import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VaccineInfoService } from 'src/app/services/vaccine-info.service';
import { ToastService } from 'src/app/shared/toast.service';
import { VACCINE_INFO_ICONS } from '../vaccine-info-icons';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  vaccineInfo: any = {};
  fg: FormGroup;
  icons: string[] = VACCINE_INFO_ICONS;
  selectedIcon = 'medkit';

  quillModules = {
    toolbar: [
      ['bold', 'italic'],
      [{ list: 'bullet' }, { list: 'ordered' }]
    ]
  };

  constructor(
    public api: VaccineInfoService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      'Id': [null],
      'Name': ['', Validators.required],
      'Icon': ['medkit', Validators.required],
      'ProtectsAgainstHtml': [''],
      'WhoShouldGetItHtml': [''],
      'ScheduleHtml': [''],
      'WhyVaccinateHtml': [''],
      'ImportantNoteHtml': [''],
      'BrandsAvailableHtml': [''],
    });
    this.getSingleVaccineInfo();
  }

  selectIcon(icon: string) {
    this.selectedIcon = icon;
    this.fg.controls['Icon'].setValue(icon);
  }

  async getSingleVaccineInfo() {
    const loading = await this.loadingController.create({
      message: 'Loading Vaccine Info'
    });

    await loading.present();
    let vaccineInfoId = this.route.snapshot.paramMap.get('id');

    await this.api.getVaccineInfoById(vaccineInfoId).subscribe(
      res => {
        this.vaccineInfo = res.ResponseData;
        loading.dismiss();
        this.fg.controls['Name'].setValue(this.vaccineInfo.Name);
        this.fg.controls['Icon'].setValue(this.vaccineInfo.Icon);
        this.selectedIcon = this.vaccineInfo.Icon;
        this.fg.controls['ProtectsAgainstHtml'].setValue(this.vaccineInfo.ProtectsAgainstHtml);
        this.fg.controls['WhoShouldGetItHtml'].setValue(this.vaccineInfo.WhoShouldGetItHtml);
        this.fg.controls['ScheduleHtml'].setValue(this.vaccineInfo.ScheduleHtml);
        this.fg.controls['WhyVaccinateHtml'].setValue(this.vaccineInfo.WhyVaccinateHtml);
        this.fg.controls['ImportantNoteHtml'].setValue(this.vaccineInfo.ImportantNoteHtml);
        this.fg.controls['BrandsAvailableHtml'].setValue(this.vaccineInfo.BrandsAvailableHtml);
        this.fg.controls['Id'].setValue(this.vaccineInfo.Id + '');
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async editVaccineInfo() {
    const loading = await this.loadingController.create({
      message: 'Vaccine info editing in process'
    });

    await loading.present();
    let vaccineInfoId = this.route.snapshot.paramMap.get('id');

    await this.api.editVaccineInfo(vaccineInfoId, this.fg.value)
      .subscribe(result => {
        if (result.IsSuccess) {
          this.router.navigate(['/members/vaccine-info']);
          loading.dismiss();
        } else {
          this.toastService.create('Error: Failed to edit vaccine info.');
          loading.dismiss();
        }
      }, (err) => {
        this.toastService.create('Error: Server Failure');
        loading.dismiss();
      });
  }

}
