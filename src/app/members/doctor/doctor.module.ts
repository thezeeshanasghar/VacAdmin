import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DoctorPage } from './doctor.page';
import { ApprovedComponent } from './approved/approved.component';
import { UnapprovedComponent } from './unapproved/unapproved.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorPage,
    children: [
      {
        path:"approved",
        component: ApprovedComponent
      }, 
      {
        path:"unapproved",
        component: UnapprovedComponent
      },
      {
        path: '',
        redirectTo: 'approved',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DoctorPage, ApprovedComponent, UnapprovedComponent]
})
export class DoctorPageModule {}
