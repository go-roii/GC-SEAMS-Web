import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
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

  profileForm = new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
  });

  get email() { return this.profileForm.get('email'); }

  credentials: Credentials={
    email: this.profileForm.controls['email'].value,
    password: this.profileForm.controls['password'].value
  }

  login(): void {
    this.userService.setUserData(this.credentials);
    this.userService.setLoginState();
  }

}
