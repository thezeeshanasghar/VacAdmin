import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {  VaccineBrandsPage } from './vaccinebrands.page';

const routes: Routes = [
  {
    path: '',
    component: VaccineBrandsPage
  },
  { path: 'add', loadChildren: 'src/app/members/vaccinebrands/add/add.module#AddPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VaccineBrandsPage],
})
export class VaccineBrandsPageModule {}
