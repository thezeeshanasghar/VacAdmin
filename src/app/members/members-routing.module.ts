import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersPage } from './members.page';

const routes: Routes = [
  {
    path: '',
    component: MembersPage,
    children: [
      { path: '', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
      { path: 'vaccine', loadChildren: './vaccine/vaccine.module#VaccinePageModule' },
      { path: 'doctor', loadChildren: './doctor/doctor.module#DoctorPageModule' },
      { path: 'child', loadChildren: './child/child.module#ChildPageModule' },
      { path: 'message', loadChildren: './message/message.module#MessagePageModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
