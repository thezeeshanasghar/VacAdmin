import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  userData = {Name: "", MinAge: "", MaxAge: ""};
  constructor() { 
    
  }
  showdataonconsole(){
    console.log(this.userData)
  }
  ngOnInit() {
  }

}
