import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AppEmailSettingsService } from 'src/app/services/app-email-settings.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.page.html',
  styleUrls: ['./email-settings.page.scss'],
})
export class EmailSettingsPage implements OnInit {

  fg: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public api: AppEmailSettingsService,
    public loadingController: LoadingController,
    public toastService: ToastService,
  ) {
    this.fg = this.formBuilder.group({
      Host: ['', Validators.required],
      Port: [587, [Validators.required, Validators.pattern('^[0-9]+$')]],
      UseSsl: [true],
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      FromEmail: ['', [Validators.required, Validators.email]],
      FromName: [''],
    });
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();
    this.api.get().subscribe(
      res => {
        loading.dismiss();
        if (res) {
          this.fg.patchValue(res);
        }
      },
      err => {
        loading.dismiss();
        console.log(err);
      }
    );
  }

  async save() {
    if (this.fg.invalid) {
      this.fg.markAllAsTouched();
      this.toastService.create('Please fill in all required fields.', 'danger');
      return;
    }

    const payload = {
      ...this.fg.value,
      Port: parseInt(this.fg.value.Port, 10),
    };

    this.api.save(payload).subscribe(res => {
      this.toastService.create('Default email settings updated');
    }, (err) => {
      console.log(err);
      this.toastService.create(err, 'danger');
    });
  }

}
