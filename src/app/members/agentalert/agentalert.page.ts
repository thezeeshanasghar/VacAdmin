import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';
import { AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-agentalert',
  templateUrl: './agentalert.page.html',
//   styleUrls: ['./agentalert.page.scss'],
})
export class AgentAlertPage implements OnInit {
  cities: any[];
  newCity: string;


  constructor(private cityService: AgentService, private alertController: AlertController, public toast: ToastService,) { }

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.cityService.getAlertCities().subscribe(data => {
      this.cities = data;
      console.log(data)
    });
  }
  updateTempCity(event, city) {
    this.newCity = event.detail.value;

  }
  async updateCity(newCity: string, city: string) {
    console.log('tem', this.newCity)
    console.log(city)
    this.cityService.updateChildCity(city).subscribe(
      res => {
        console.log('res', res);
        if (res.IsSuccess) {
          console.log('Agent updated successfully.');
          this.toast.create('Agent updated successfully.');
          this.loadCities();
        }
      },
      error => {
        if (error.status === 400) {
          this.toast.create("Cannot update the Agent because it already exists.", 'danger');
        }
        else {
          console.error('Error updating Agent:', error);
          this.toast.create(error, 'danger');
        }
      }
    );
  }
}
