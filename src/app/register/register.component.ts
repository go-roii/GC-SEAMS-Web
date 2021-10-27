import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  profileForm=new FormGroup({
    name:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl(''),
    password_confirmation:new FormControl('')
  });

  register(): void {}

}
