import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  //   path: 'vaccine/:id/detail',
  //   loadChildren: './vaccine/detail/detail.module#DetailPageModule'
  // },
  // {
  //   path: 'vaccine/Add',
  //   loadChildren: './vaccine/add/add.module#AddPageModule'
  // },
  // {
  //   path: 'vaccine/:id/edit',
  //   loadChildren: './vaccine/edit/edit.module#EditPageModule'
  // },
  // {
  //   path: 'vaccine/:id/brand',
  //   loadChildren: './brand/brand.module#BrandPageModule'
  // },
  // {
  //   path: 'vaccine/:id/dose',
  //   loadChildren: './dose/dose.module#DosePageModule'
  // },
  // {
  //   path: 'vaccine/:id/dose/add',
  //   loadChildren: './dose/add/add.module#AddPageModule'
  // },
  // {
  //   path: 'vaccine/:id/dose/:id',
  //   loadChildren: './dose/edit/edit.module#EditPageModule'
  // },
 
  // {
  //   path: 'doctor/:id/detail',
  //   loadChildren: './doctor/detail/detail.module#DetailPageModule'
  // },

  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'members', loadChildren: './members/members.module#MembersPageModule' }
  // { path: 'dashboard', loadChildren: './members/dashboard/dashboard.module#DashboardPageModule' },
  // { path: 'vaccine', loadChildren: './members/vaccine/vaccine.module#VaccinePageModule' },
  // { path: 'dose', loadChildren: './members/dose/dose.module#DosePageModule' },
  // { path: 'dose', loadChildren: './members/vaccine/dose/dose.module#DosePageModule' },
  // { path: 'brand', loadChildren: './members/vaccine/brand/brand.module#BrandPageModule' },
  // { path: 'doctor', loadChildren: './members/doctor/doctor.module#DoctorPageModule' },
  // { path: 'child', loadChildren: './members/child/child.module#ChildPageModule' },
  // { path: 'message', loadChildren: './members/message/message.module#MessagePageModule' },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
