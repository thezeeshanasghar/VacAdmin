import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'vaccine',
    loadChildren: './vaccine/vaccine.module#VaccinePageModule'
  },
  {
    path: 'vaccine/:id/detail',
    loadChildren: './vaccine/detail/detail.module#DetailPageModule'
  },
  {
    path: 'vaccine/Add',
    loadChildren: './vaccine/add/add.module#AddPageModule'
  },
  {
    path: 'vaccine/:id/edit',
    loadChildren: './vaccine/edit/edit.module#EditPageModule'
  },
  {
    path: 'vaccine/:id/brand',
    loadChildren: './brand/brand.module#BrandPageModule'
  },
  {
    path: 'vaccine/:id/dose',
    loadChildren: './dose/dose.module#DosePageModule'
  },
  {
    path: 'vaccine/:id/dose/add',
    loadChildren: './dose/add/add.module#AddPageModule'
  },
  {
    path: 'vaccine/:id/dose/:id',
    loadChildren: './dose/edit/edit.module#EditPageModule'
  },
  {
    path: 'doctor',
    loadChildren: './doctor/doctor.module#DoctorPageModule'
  },
  {
    path: 'doctor/:id/detail',
    loadChildren: './doctor/detail/detail.module#DetailPageModule'
  },
  {
    path: 'message',
    loadChildren: './message/message.module#MessagePageModule'
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
