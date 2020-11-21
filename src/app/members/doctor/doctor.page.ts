import { Component, OnInit } from '@angular/core';
//import { Events } from '@ionic/angular';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {

  approvedCount: number;
  unapprovedCount: number;
  
  constructor() { }
  //constructor(private event: Events) { }

  ngOnInit() {
    // this.event.subscribe('approvedCount', (count) => {
    //   this.approvedCount = count;
    // });
    // this.event.subscribe('unapprovedCount', (count) => {
    //   this.unapprovedCount = count;
    // });
   
  }
 
}
