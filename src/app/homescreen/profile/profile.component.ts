import { Component, OnInit } from '@angular/core';
import {Courses} from "../../models/Courses";
import {Departments} from "../../models/Departments";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {RequestParams} from "../../models/RequestParams";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserProfile} from "../../models/UserProfile";
import {catchError} from "rxjs/operators";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    '../homescreen.component.scss',
    './profile.component.scss'
  ]
})
export class ProfileComponent implements OnInit {

  isUserRegistering: boolean = false;

  confirmationIsValid!: boolean;
  courses: Courses[]=[];
  departments: Departments[]=[];
  activeUser!: UserProfile;
  activeUserDepartment!: Departments;
  activeUserCourse!: Courses;

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
    private dataService: DataService,
    private userService: UserService) { }

  ngOnInit(): void {

    this.getDepartments();
    this.confirmationIsValid=true;
    this.setProfileFieldsValues(this.userService.getActiveUser());
    console.log(this.userService.getActiveUser())

  }

  setProfileFieldsValues(profile: UserProfile){
    this.firstName = profile.first_name;
    this.middleName=profile.middle_name;
    this.lastName=profile.last_name;
    this.email=profile.email_address;
    this.password=profile.password;
    this.passwordConfirmation=profile.password;

    const department: Departments ={
      department_chosen: false,
      department_code: profile.department_code,
      department_id: profile.department_id,
      department_name: profile.department_name
    }

    const course: Courses={
      course_code: profile.course_code,
      course_id: profile.course_id,
      course_name: ""
    }



    this.setActiveDepartment(department).then(r => {
      this.setActiveCourse(course);
    })

  }

  setActiveCourse(data: Courses){
    this.activeUserCourse = data;
  }

  async setActiveDepartment(data: Departments){
    this.activeUserDepartment = data;
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

  //setters for profile form
  set firstName(data:string) { this.profileForm.controls['firstName'].setValue(data);}
  set middleName(data: string) { this.profileForm.controls['middleName'].setValue(data); }
  set lastName(data: string) { this.profileForm.controls['lastName'].setValue(data); }
  set email(data: string) { this.profileForm.controls['email'].setValue(data); }
  set department(data: string) { this.profileForm.controls['department'].setValue(data); }
  set course(data: string) { this.profileForm.controls['course'].setValue(data); }
  set password(data: string) { this.profileForm.controls['password'].setValue(data); }
  set passwordConfirmation(data: string) { this.profileForm.controls['passwordConfirmation'].setValue(data); }

  //Getters for validation of the fields
  get firstName() { return this.profileForm.controls['firstName'].value; }
  get middleName() { return this.profileForm.controls['middleName'].value; }
  get lastName() { return this.profileForm.controls['lastName'].value; }
  get email() { return this.profileForm.controls['email'].value; }
  get department() { return this.profileForm.controls['firstName'].value; }
  get course() { return this.profileForm.controls['course'].value; }
  get password() { return this.profileForm.controls['password'].value; }
  get passwordConfirmation() { return this.profileForm.controls['passwordConfirmation'].value; }



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

      this.dataService.httprequest(registrationParams).subscribe( async (res: any)=>{
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
        })

        this.router.navigateByUrl('/');
      });
    }else{
      alert('Passwords does not match');
      this.isUserRegistering = false;
    }
  }

}
