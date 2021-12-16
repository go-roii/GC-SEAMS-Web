import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Courses } from '../models/Courses';
import { Departments } from '../models/Departments';
import { RequestParams } from '../models/RequestParams';
import { UserProfile } from '../models/UserProfile';
import { DataService } from '../services/data.service';
import {catchError} from "rxjs/operators";
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  isUserRegistering: boolean = false;

  confirmationIsValid!: boolean;
  courses: Courses[]=[];
  departments: Departments[]=[];

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      popup: 'gs-dialog',
      confirmButton: 'btn btn-primary rounded-pill',
      cancelButton: 'btn btn-danger rounded-pill'
    },
    buttonsStyling: false
  })

  constructor(
    private router: Router,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.getDepartments();
    this.confirmationIsValid=true;
  }

  departmentSelectionChanged(){
      const departmentId = this.profileForm.controls['department'].value
    //console.log(department)
    this.getCoursesByDepartmentID(departmentId);
  }

  getDepartments(){
    const departmentParams= new RequestParams();
    departmentParams.EndPoint="departments";
    departmentParams.RequestType=1;

    this.dataService.httprequest(departmentParams)
    .subscribe((data: Departments[]) => this.departments = data);
  }

  getCoursesByDepartmentID(departmentID: number){
    const coursesParams= new RequestParams();
    coursesParams.EndPoint="courses/"+departmentID;
    coursesParams.RequestType=1;
    console.log(departmentID)

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
    course:new FormControl('select course',[Validators.required,]),
    password:new FormControl('',[ Validators.minLength(8), Validators.required]),
    passwordConfirmation:new FormControl('',[Validators.required])
   });

  //Getters for validation of the fields
  get firstName() { return this.profileForm.get('firstName'); }
  get middleName() { return this.profileForm.get('middleName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get email() { return this.profileForm.get('email'); }
  get department() { return this.profileForm.get('department'); }
  get course() { return this.profileForm.get('course'); }
  get password() { return this.profileForm.get('password'); }
  get passwordConfirmation() { return this.profileForm.get('passwordConfirmation'); }

  register(): void {
    this.isUserRegistering = true;

    const newUser: UserProfile={
      email_address : this.profileForm.controls['email'].value,
      password : this.profileForm.controls['password'].value,
      first_name : this.profileForm.controls['firstName'].value,
      middle_name : this.profileForm.controls['middleName'].value,
      last_name : this.profileForm.controls['lastName'].value,
      course_id : this.profileForm.controls['course'].value,
      course_code: '',
      department_code: '',
      department_name: '',
      department_id: 0
    }

    if(newUser.password==this.profileForm.controls['passwordConfirmation'].value){
      const registrationParams= new RequestParams();
      registrationParams.EndPoint="register";
      registrationParams.Body=newUser;
      registrationParams.RequestType=2;

      console.log(registrationParams.Body)

      this.dataService.httprequest(registrationParams).subscribe(async (res: any) => {
        catchError(this.dataService.handleError)
        const data = await res.payload
        //await this.user.setUserData(data)
        //await this.user.setLoginState()

        this.isUserRegistering = false;
        // alert('You are now registered');
        // profileForm.reset()

        this.swalWithBootstrapButtons.fire({
          icon: 'success',
          title: 'Success!',
          text: 'You are now registered.'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/');
          }
        });
      });
    }else{
      alert('Passwords does not match');
      this.isUserRegistering = false;
    }
  }
}



