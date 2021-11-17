import { ThisReceiver } from '@angular/compiler';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Courses } from 'src/app/models/Courses';
import { Departments } from 'src/app/models/Departments';
import { Events } from 'src/app/models/Events';
import { RequestParams } from 'src/app/models/RequestParams';
import { UserData } from 'src/app/models/UserData';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { EventCardComponent } from './event-card/event-card.component';
import {DepartmentService} from "../../services/department.service";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
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

  constructor(private router: Router, private  dataService: DataService, private userService: UserService, private departmentService: DepartmentService) {
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
      case 'Course': this.byCourse=true;
      break;
      case 'Department': this.byCourse=false;
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

  deleteEvent(event: Events){
    const id=event.ID;
    const index=this.getIndex(id);
    this.eventData.splice(index, 1)
    this.shrinkEventDataId(id)
    console.log("event id to delete: "+id)
    console.log("index to delete: "+index);
  }

  deleteCard(event: Events){
    const index=this.getIndex(event.ID);
    this.events.splice(index, 1);
    this.count=this.getMaxEventDataId();
    console.log("component id to delete: "+event.id)
    console.log("index to delete: "+index);
  }

  getMaxEventDataId(){
    let max: number = 0;
    this.eventData.forEach(element => {
      max=element.ID;
    });
    return max;
  }

  shrinkEventDataId(startIndex: number){
    //this.count-=1;
    this.eventData.forEach(element => {
      if(element.ID>startIndex){
        element.ID-=1;
      }
    });
  }

  getIndex(id: number){
    let count=0;
    while(count<id){
      count++;
    }
    return count-1;
  }

  addCard(){
    this.count+=1
    const newCard= new EventCardComponent(this.dataService, this.departmentService);
    this.events.push(newCard)
   }

  ngOnInit(): void {
    this.addCard();
    //this.getCourses();
    //this.getDepartments();
    //console.log(this.userService.getUserData());
  }

  printInputs(): void{
    console.log(this.eventData)
  }
}
