import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgentAlertPage } from './agentalert.page';
import { ReactiveFormsModule } from '@angular/forms'; // Import this module

const routes: Routes = [
  {
    path: '',
    component: AgentAlertPage
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
  declarations: [AgentAlertPage]
})
export class AgentAlertPageModule {}
