import { Component, OnInit } from '@angular/core';
import { VaccineService } from 'src/app/services/vaccine.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  doctors:any;
  vaccines:any;
  totalVaccine:number;
  totalDoctor:number;

  constructor( public api: DoctorService,  public api1: VaccineService, public loadingController: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
   await   this.getApprovedDoctors();
    await  this.getVaccines();
   await loading.dismiss();
  }

  async getApprovedDoctors() {
   await this.api.getApprovedDoctors().subscribe(
      res => {
       
        this.doctors = res.ResponseData;  
         this.totalDoctor=res.ResponseData.length;
        console.log("Doctors",this.totalDoctor); 
      },
      err => {
        console.log(err);  
      }
    );
  }

  async getVaccines() {
  
    await this.api1.getVaccines().subscribe(
      res => {
        this.vaccines = res.ResponseData;
         this.totalVaccine=res.ResponseData.length;
        console.log("Vaccines", this.totalVaccine);
     
      },
      err => {
        console.log(err);
      
      }
    );
  }
}
