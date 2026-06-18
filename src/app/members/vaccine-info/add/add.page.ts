import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VaccineInfoService } from 'src/app/services/vaccine-info.service';
import { ToastService } from 'src/app/shared/toast.service';
import { VACCINE_INFO_ICONS } from '../vaccine-info-icons';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

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
    public toast: ToastService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      'Name': [null, Validators.required],
      'Icon': [this.selectedIcon, Validators.required],
      'ProtectsAgainstHtml': [''],
      'WhoShouldGetItHtml': [''],
      'ScheduleHtml': [''],
      'WhyVaccinateHtml': [''],
      'ImportantNoteHtml': [''],
    });
  }

  selectIcon(icon: string) {
    this.selectedIcon = icon;
    this.fg.controls['Icon'].setValue(icon);
  }

  async addVaccineInfo() {
    try {
      const loading = await this.loadingController.create({
        message: 'Adding vaccine info...'
      });
      await loading.present();
      const response = await this.api.addVaccineInfo(this.fg.value).toPromise();
      await loading.dismiss();
      if (response.IsSuccess) {
        await this.toast.create('Vaccine info added successfully');
        await this.router.navigate(['/members/vaccine-info']);
      } else {
        await this.toast.create(response.Message || 'Failed to add vaccine info');
      }
    } catch (error) {
      console.error('Error adding vaccine info:', error);
      await this.loadingController.dismiss();
      await this.toast.create(error.message || 'An unexpected error occurred');
    }
  }

}
