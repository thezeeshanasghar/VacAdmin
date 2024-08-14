import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CityAlertPage } from './cityalert.page';
import { ReactiveFormsModule } from '@angular/forms'; // Import this module

const routes: Routes = [
  {
    path: '',
    component: CityAlertPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule ,
    RouterModule.forChild(routes)
  ],
  declarations: [CityAlertPage]
})
export class CityAlertPageModule {}
