import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.page.html',
//   styleUrls: ['./agent.page.scss'],
})
export class AgentPage implements OnInit {
  cities: any[];

  constructor(private cityService: AgentService, private alertController: AlertController) { }

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.cityService.getAllCities().subscribe(data => {
        console.log(data)
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
