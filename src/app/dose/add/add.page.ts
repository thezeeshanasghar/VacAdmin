import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { DoseService } from 'src/app/services/dose.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  classroomForm: FormGroup;
  students: FormArray;
  constructor(
    public api: DoseService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    // this.getClassroom(this.route.snapshot.paramMap.get('id'));
    this.classroomForm = this.formBuilder.group({
      'class_name' : [null, Validators.required],
      'students' : this.formBuilder.array([])
    });
   }

  ngOnInit() {
  }

}
