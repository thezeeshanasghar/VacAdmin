import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-city',
  templateUrl: './cityalert.page.html',
  styleUrls: ['./cityalert.page.scss'],
})
export class CityAlertPage implements OnInit {
  cities: any[];
  newCity: string;
 

  constructor(private cityService: CityService, private alertController: AlertController,public toast: ToastService,) { }

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
  async updateCity( newCity: string,city: string) {
    console.log('tem',this.newCity)
    console.log(city)
    this.cityService.updateChildCity(city, newCity).subscribe(
      res => {
        console.log('res',res);
        if (res.IsSuccess) {
          console.log('City updated successfully.');
          this.toast.create('City updated successfully.');
          // Reload the list of cities after the update
          this.loadCities();
          
        }
       

      },
      error => {
        
        if (error.status === 400) {
          
          this.toast.create( "Cannot update the city because it already exists.", 'danger');
        }
        else{
          console.error('Error updating city:', error);
          this.toast.create( error, 'danger');
        }
      }
    );
  
  }

 
}
