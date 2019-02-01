import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DosePage } from './dose.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: DosePage
  }, 
  { path: 'add', loadChildren: 'src/app/members/vaccine/dose/add/add.module#AddPageModule' },
  { path: 'edit/:id', loadChildren: 'src/app/members/vaccine/dose/edit/edit.module#EditPageModule'},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [DosePage]
})
export class DosePageModule {}
