import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { TodoDataService } from '../service/data/todo-data.service';
 import { User } from '../models/user';
import { Assignment } from '../models/assignments';
import { Router } from '@angular/router';
import {AssignmentCreationAndRegisterRequestDto} from '../models/AssignmentCreationAndRegisterRequestDto';
import {AssignmentBase} from '../models/AssignmentBase';
import {HardcodedAuthenticationService} from '../service/hardcoded-authentication.service';
import {AUTHENTICATED_USER} from '../service/basic-authentication.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  request = new AssignmentCreationAndRegisterRequestDto(new User('', ''), new AssignmentBase(new User('', ''), '', '', '', '', '', 0));
  angForm: FormGroup;
  invalidLogin = false;

   constructor(private hardcodedAuthenticationService
                 : HardcodedAuthenticationService, private router: Router,
    private fb: FormBuilder,
    private tosoService: TodoDataService) {
    this.createForm();
  }
   createForm() {
    if (this.hardcodedAuthenticationService.isUserLoggedIn()) {
      this.angForm = this.fb.group({
        subject: ['', Validators.required ],
        date: ['', Validators.required],
        time: ['', Validators.required]
      });
    } else {
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
   }

  ngOnInit() {
  }

  saveForm() {
     debugger
    console.log(this.request);
    this.request.assignment.subject = this.angForm.get('subject').value;
    this.request.assignment.deadlineDate = this.angForm.get('date').value;
    this.request.assignment.deadlineTime = this.angForm.get('time').value;

    if (this.hardcodedAuthenticationService.isUserLoggedIn()) {
      this.request.assignment.owner.email = sessionStorage.getItem(AUTHENTICATED_USER);
      this.tosoService.createAssignment(this.request.assignment)
        .subscribe(
          data => {
            debugger;
            this.router.navigate(['todos']);
            this.invalidLogin = false;
          },
          error => {
            console.log(error);
            this.invalidLogin = true;
          }
        );
    } else {
      this.request.user.email = this.angForm.get('email').value;
      this.request.assignment.owner.email = this.angForm.get('email').value;
      this.tosoService.createAssignmentAndRegister(this.request)
        .subscribe(
          data => {
            debugger;
            this.router.navigate(['todos']);
            this.invalidLogin = false;
          },
          error => {
            console.log(error);
            this.invalidLogin = true;
          }
        );
    }
  }
}
