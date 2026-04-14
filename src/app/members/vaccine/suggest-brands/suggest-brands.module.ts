import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { SuggestBrandsPage } from './suggest-brands.page';

const routes: Routes = [
  {
    path: '',
    component: SuggestBrandsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SuggestBrandsPage]
})
export class SuggestBrandsPageModule {}
