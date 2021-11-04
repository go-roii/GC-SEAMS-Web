import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Courses } from '../models/Courses';
import { Departments } from '../models/Departments';
import { RequestParams } from '../models/RequestParams';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[
    DataService
  ],
})
export class RegisterComponent implements OnInit {

  courses: Courses[]=[]
  departments: Departments[]=[]


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getDepartments();
    this.getCourses();
  }

  getDepartments(){
    const coursesParams= new RequestParams();
    coursesParams.EndPoint="departments";
    coursesParams.RequestType=1;

    this.dataService.httprequest(coursesParams)
    .subscribe((data: Departments[]) => this.departments = data);
  }

  getCourses(){
    const coursesParams= new RequestParams();
    coursesParams.EndPoint="courses";
    coursesParams.RequestType=1;

    this.dataService.httprequest(coursesParams)
    .subscribe((data: Courses[]) => this.courses = data);
  }


  //create form group and form controls for fields
  profileForm=new FormGroup({
    firstName:new FormControl('',[Validators.required,]),
    middleName:new FormControl(''),
    lastName:new FormControl('',[Validators.required,]),
    email:new FormControl('',[Validators.required,Validators.email]),
    department:new FormControl('',[Validators.required,]),
    course:new FormControl('',[Validators.required,]),
    level:new FormControl('',[Validators.required,]),
    password:new FormControl('',[ Validators.minLength(8), Validators.required]),
    passwordConfirmation:new FormControl('',[Validators.required])
  });


  //Getters for validation of the fields
  get firstName() { return this.profileForm.get('firstName'); }
  get middleName() { return this.profileForm.get('middleName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get email() { return this.profileForm.get('email'); }
  get course() { return this.profileForm.get('course'); }
  get level() { return this.profileForm.get('level'); }
  get password() { return this.profileForm.get('password'); }
  get passwordConfirmation() { return this.profileForm.get('passwordConfirmation'); }

  register(): void {

    const newUser={
      firstName : this.profileForm.controls['firstName'].value,
      middleName : this.profileForm.controls['middleName'].value,
      lastName : this.profileForm.controls['lastName'].value,
      email : this.profileForm.controls['email'].value,
      course : this.profileForm.controls['course'].value,
      level : this.profileForm.controls['level'].value,
      password : this.profileForm.controls['password'].value,
      passwordConfirmation : this.profileForm.controls['passwordConfirmation'].value,
    }

    console.log('firstName: '+newUser.firstName)
    console.log('middleName: '+newUser.middleName)
    console.log('lastName: '+newUser.lastName)
    console.log('email: '+newUser.email)
    console.log('course: '+newUser.course)
    console.log('level: '+newUser.level)
    console.log('password: '+newUser.password)
    console.log('passwordConfirmation: '+newUser.passwordConfirmation)

    this.profileForm.reset();
  }
}
