import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {
  cities: any[];

  constructor(private cityService: CityService, private alertController: AlertController) { }

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.cityService.getAllCities().subscribe(data => {
      this.cities = data;
    });
  }

  async addCity() {
    const alert = await this.alertController.create({
      header: 'Add City',
      inputs: [{ name: 'name', type: 'text', placeholder: 'City Name' }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Add', handler: (data) => {
          this.cityService.addCity({ Name: data.name }).subscribe(() => {
            this.loadCities();
          });
        }}
      ]
    });
    await alert.present();
  }

  deleteCity(id: number) {
    this.cityService.deleteCity(id).subscribe(() => {
      this.loadCities();
    });
  }
}
