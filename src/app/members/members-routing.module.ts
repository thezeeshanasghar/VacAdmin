import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersPage } from './members.page';

const routes: Routes = [
  {
    path: '',
    component: MembersPage,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
      { path: 'vaccine', loadChildren: './vaccine/vaccine.module#VaccinePageModule' },
      { path: 'doctor', loadChildren: './doctor/doctor.module#DoctorPageModule' },
      { path: 'child', loadChildren: './child/child.module#ChildPageModule' },
      { path: 'message', loadChildren: './message/message.module#MessagePageModule' },
      { path: 'cities', loadChildren: './city/city.module#CityPageModule' },
      { path: 'citiesAlert', loadChildren: './cityalert/cityalert.module#CityAlertPageModule' },
      { path: 'agent', loadChildren: './agent/agent.module#AgentPageModule' },
      { path: 'agentAlert', loadChildren: './agentalert/agentalert.module#AgentAlertPageModule' },
      { path: 'vaccineBrands', loadChildren: './vaccinebrands/vaccinebrands.module#VaccineBrandsPageModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
