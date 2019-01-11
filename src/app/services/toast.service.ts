import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController
  ) { }

  async presentToast(err) {
    const toast = await this.toastController.create({
      message: err,
      duration: 5000
    });
    toast.present();
  }
}
