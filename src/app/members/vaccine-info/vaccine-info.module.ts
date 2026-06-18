import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VaccineInfoPage } from './vaccine-info.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: VaccineInfoPage
  },
  { path: 'add', loadChildren: 'src/app/members/vaccine-info/add/add.module#AddPageModule' },
  { path: 'edit/:id', loadChildren: 'src/app/members/vaccine-info/edit/edit.module#EditPageModule' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [VaccineInfoPage]
})
export class VaccineInfoPageModule { }
