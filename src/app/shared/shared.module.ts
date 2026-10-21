import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Number2WeekPipe } from './number2-week.pipe';

import { InstantPipe, DayPipe } from './time';

@NgModule({
  declarations: [Number2WeekPipe, InstantPipe, DayPipe],
  imports: [
    CommonModule
  ],
  exports: [
    InstantPipe,
    DayPipe,
    Number2WeekPipe
  ]
})
export class SharedModule { }
