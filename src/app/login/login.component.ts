import { BasicAuthenticationService } from './../service/basic-authentication.service';
import { HardcodedAuthenticationService } from './../service/hardcoded-authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'murvean'
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidLogin = false
  user = new User('','')


  constructor(private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit() {
  }

  handleLogin() {
    if(this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false
    } else {
      this.invalidLogin = true
    }
  }

  handleBasicAuthLogin() {
    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['welcome', this.username])
            this.invalidLogin = false      
          },
          error => {
            console.log(error)
            this.invalidLogin = true
          }
        )
  }

  handleJWTAuthLogin() {
    this.user.email = this.username
    this.user.encryptedPassword = this.password
    this.basicAuthenticationService.executeJWTAuthenticationService(this.user)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['welcome', this.username])
            this.invalidLogin = false      
          },
          error => {
            console.log(error)
            this.invalidLogin = true
          }
        )
  }

}
