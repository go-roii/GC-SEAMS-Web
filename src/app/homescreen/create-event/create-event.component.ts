import { ThisReceiver } from '@angular/compiler';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Courses } from 'src/app/models/Courses';
import { Departments } from 'src/app/models/Departments';
import { Events } from 'src/app/models/Events';
import { RequestParams } from 'src/app/models/RequestParams';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { EventCardComponent } from './event-card/event-card.component';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  providers: [DataService]
})
export class CreateEventComponent implements OnInit {

  count = 0;
  events: EventCardComponent[]=[];
  eventData: Events[] = [];
  courses: Courses[] = [];
  departments: Departments[]=[];

  byCourse!: boolean;
  sortBy: string='';

    // @HostBinding('className') componentClass: string;

  constructor(private router: Router, private  dataService: DataService) {
  }

  //create form group and form controls for fields
  invitationForm=new FormGroup({
    choice:new FormControl(''),
    courseOrDepartment:new FormControl(''),
  });

  get choice() { return this.invitationForm.get('firstName'); }
  get courseOrDepartment() { return this.invitationForm.get('middleName'); }

  selectionChanged(){
    this.sortBy=this.invitationForm.controls['choice'].value;

    switch(this.sortBy){
      case 'course': this.byCourse=true;
      break;
      case 'department': this.byCourse=false;
      break;
    }
  }

  getDepartments(){
    const departmentParams= new RequestParams();
    departmentParams.EndPoint="departments";
    departmentParams.RequestType=1;

    this.dataService.httprequest(departmentParams)
    .subscribe((data: Departments[]) => this.departments = data);
  }

  getCourses(){
    const coursesParams= new RequestParams();
    coursesParams.EndPoint="courses";
    coursesParams.RequestType=1;

    this.dataService.httprequest(coursesParams)
    .subscribe((data: Courses[]) => this.courses = data);
  }

  addEventData(newEvent: Events) {
    newEvent.id=this.count
    this.eventData.push(newEvent);
  }

   addCard(){
    this.count=this.count+1
    const newCard= new EventCardComponent();
    this.events.push(newCard)
   }

  ngOnInit(): void {
    this.addCard();
    this.getCourses();
    this.getDepartments();
  }

  printInputs(): void{
    console.log(this.eventData)
  }
}
