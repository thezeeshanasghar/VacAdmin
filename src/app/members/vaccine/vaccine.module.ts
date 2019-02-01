import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VaccinePage } from './vaccine.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: VaccinePage
  }, 
  { path: 'add', loadChildren: './add/add.module#AddPageModule' },
  { path: 'edit/:id', loadChildren: './edit/edit.module#EditPageModule'},
  { path: ':id/doses', loadChildren: './dose/dose.module#DosePageModule'},
  { path: ':id/brands', loadChildren: './brand/brand.module#BrandPageModule'},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [VaccinePage]
})
export class VaccinePageModule { }
