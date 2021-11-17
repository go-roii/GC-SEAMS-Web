import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../models/Credential';
import { RequestParams } from '../models/RequestParams';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import {UserProfile} from "../models/UserProfile";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private dataService: DataService) {}

  ngOnInit(): void {
  }

  credentialsForm = new FormGroup({
    email:new FormControl('gc_seams@gordoncollege.edu.ph',[Validators.required,Validators.email]),
    password:new FormControl('roy_idol_nakin',[ Validators.required]),
  });

  //getters for the fields' validation
  get email() { return this.credentialsForm.get('email'); }
  get password() { return this.credentialsForm.get('password'); }



  login(): void {

    const credentials: Credentials={
      email_address: this.credentialsForm.controls['email'].value,
      password: this.credentialsForm.controls['password'].value
    }

    const loginParams= new RequestParams();
    loginParams.EndPoint="login";
    loginParams.Body=credentials;
    loginParams.RequestType=2;

    console.log(loginParams)
    const user: UserProfile = {
      email_address:"gcseams@gordoncollege.edu.ph",
      password: "roy_idol_nakin",
      first_name:"GC",
      middle_name:"",
      last_name:"SEAMS",
      course_id: 1
    }

    this.userService.ActiveUser=user;

    this.dataService.httprequest(loginParams).subscribe( async (res: UserProfile)=>{
      const data = await res
      //this.userService.ActiveUser=data;
      await this.userService.setLoginState();
    });
  }

}
