import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MembersPage } from './members.page';

import { MembersRoutingModule } from './members-routing.module';

@NgModule({
  declarations: [MembersPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembersRoutingModule
  ]
})
export class MembersPageModule { }
