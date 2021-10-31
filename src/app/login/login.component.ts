import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../models/Credential';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  providers:[UserService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService ) {}

  ngOnInit(): void {
  }

  credentialsForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[ Validators.minLength(8), Validators.required]),
  });

  get email() { return this.credentialsForm.get('email'); }
  get password() { return this.credentialsForm.get('password'); }

  credentials: Credentials={
    email: this.credentialsForm.controls['email'].value,
    password: this.credentialsForm.controls['password'].value
  }

  login(): void {
    this.userService.setUserData(this.credentials);
    this.userService.setLoginState();
  }

}
