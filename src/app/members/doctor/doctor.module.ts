import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DoctorPage } from './doctor.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorPage,
    children:[
      { path: '', redirectTo: 'approved', pathMatch: 'full' },
      { path: 'approved', loadChildren: './approved/approved.module#ApprovedPageModule' },
      { path: 'unapproved', loadChildren: './unapproved/unapproved.module#UnapprovedPageModule' }
    ]
  },
  { path: ':id/permissions', loadChildren: './permission/permission.module#PermissionPageModule' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DoctorPage]
})
export class DoctorPageModule {}
