import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../models/Credential';
import { RequestParams } from '../models/RequestParams';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[
    UserService,
    DataService
  ]
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private dataService: DataService) {}

  ngOnInit(): void {
  }

  credentialsForm = new FormGroup({
    email:new FormControl('gc_seams@gordoncollege.edu.ph',[Validators.required,Validators.email]),
    password:new FormControl('gc_seams_like_hell',[ Validators.required]),
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

    this.dataService.httprequest(loginParams).subscribe( async (res: any)=>{
      const data = await res
      //await this.userService.setUserData(data)
      await this.userService.setLoginState()
    });

    this.credentialsForm.reset()
  }

}
