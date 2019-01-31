import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  public appPages = [
    {
      title: 'Dashboard',
      url: '/members/dashboard',
      icon: 'home'
    },
    {
      title: 'Vaccine',
      url: '/members/vaccine',
      icon: 'color-filter'
    },
    {
      title: 'Doctor',
      url: '/members/doctor',
      icon: 'medkit'
    },
    {
      title: 'Message',
      url: '/members/message',
      icon: 'mail'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
