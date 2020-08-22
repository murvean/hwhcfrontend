import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { TodoDataService } from '../service/data/todo-data.service';
 import { User } from '../models/user';
import { Assignment } from '../models/assignments';
import { Router } from '@angular/router';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  assignment = new Assignment(new User('',''),'','','');
  angForm: FormGroup;
  invalidLogin = false
  
   constructor(private router: Router,
    private fb: FormBuilder, 
    private tosoService: TodoDataService) {
    this.createForm();
  }
   createForm() {
    this.angForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      subject: ['', Validators.required ],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  saveForm(){
    this.assignment.owner.email = this.angForm.get('email').value
    this.assignment.subject = this.angForm.get('subject').value
    this.assignment.deadlineDate = this.angForm.get('date').value
    this.assignment.deadlineTime = this.angForm.get('time').value
    console.log(this.assignment)

    this.tosoService.createAssignment(this.assignment)
        .subscribe(
          data => {
            console.log(data)   
            this.router.navigate(['todos'])
            this.invalidLogin = false   
          },
          error => {
            console.log(error)
            this.invalidLogin = true
          }
        )
  }
}
