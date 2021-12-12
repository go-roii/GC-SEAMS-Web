import { ThisReceiver } from '@angular/compiler';
import { Component, HostBinding, NgZone, OnInit, QueryList, ViewChildren } from '@angular/core';
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
import {SpeakersService} from "../../services/speakers.service";
import {EventsToAdd} from "../../models/EventsToAdd";
import {Speaker} from "../../models/Speaker";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: [
    '../homescreen.component.scss',
    './create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  @ViewChildren (EventCardComponent) eventCardComponents!: QueryList<EventCardComponent>;
  
  isEventFormDirty: boolean = false;
  isEventCreating: boolean = false;

  count = 0;
  events: EventCardComponent[] = [];
  eventData: Events[] = [];
  courses: Courses[] = [];
  departments: Departments[] = [];

  byCourse!: boolean;
  sortBy: string = '';

  // @HostBinding('className') componentClass: string;

  constructor(private router: Router,
              private dataService: DataService,
              private userService: UserService,
              private departmentService: DepartmentService,
              private speakerService: SpeakersService
  ) {
  }

  //process the Event Data to follow the request object format
  private processEventData() {

    let eventDataToAdd: EventsToAdd[] = [];
    let departmentToAdd: Array<number> = [];
    let speakersToAdd: Array<number> = [];


    for (let event of this.eventData) {

      let strict: boolean;

      //check if the selected option is strict or not
      if(event.eventIsStrict=='Beginning only'){
        strict=false;
      }else{
        strict=true;
      }

      const data: EventsToAdd = {
        event_id: 0,
        event_uuid: '',
        event_title: event.eventName,
        event_description: event.eventDetails,
        event_start_date: event.eventDate + 'T' + event.eventStartTime + ':00',
        event_end_date: event.eventDate + 'T' + event.eventEndTime + ':00',
        seminar_hours: event.eventSeminarHours,
        is_attendance_strict: strict,
        timezone_id: 'Asia/Manila',
        registration_link: event.eventRegistrationForm,
        departments: event.departments,
        speakers: event.eventSpeakers
      }

      eventDataToAdd.push(data);

    }

    return eventDataToAdd;
  }

  //create form group and form controls for fields
  invitationForm = new FormGroup({
    choice: new FormControl(''),
    courseOrDepartment: new FormControl(''),
  });

  get choice() {
    return this.invitationForm.get('firstName');
  }

  get courseOrDepartment() {
    return this.invitationForm.get('middleName');
  }

  selectionChanged() {
    this.sortBy = this.invitationForm.controls['choice'].value;

    switch (this.sortBy) {
      case 'Course':
        this.byCourse = true;
        break;
      case 'Department':
        this.byCourse = false;
        break;
    }
  }

  getDepartments() {
    const departmentParams = new RequestParams();
    departmentParams.EndPoint = "departments";
    departmentParams.RequestType = 1;

    this.dataService.httprequest(departmentParams)
      .subscribe((data: Departments[]) => this.departments = data);
  }

  getCourses() {
    const coursesParams = new RequestParams();
    coursesParams.EndPoint = "courses";
    coursesParams.RequestType = 1;

    this.dataService.httprequest(coursesParams)
      .subscribe((data: Courses[]) => this.courses = data);
  }

  addEventData(newEvent: Events) {
    newEvent.id = this.count
    this.eventData.push(newEvent);
  }

  deleteEvent(event: Events) {
    const id = event.ID;
    const index = this.getIndex(id);
    this.eventData.splice(index, 1)
    this.shrinkEventDataId(id)
    console.log("event id to delete: " + id)
    console.log("index to delete: " + index);
  }

  deleteCard(event: Events) {
    const index = this.getIndex(event.ID);
    this.events.splice(index, 1);
    this.count = this.getMaxEventDataId();
    console.log("component id to delete: " + event.id)
    console.log("index to delete: " + index);
  }

  getMaxEventDataId() {
    let max: number = 0;
    this.eventData.forEach(element => {
      max = element.ID;
    });
    return max;
  }

  shrinkEventDataId(startIndex: number) {
    //this.count-=1;
    this.eventData.forEach(element => {
      if (element.ID > startIndex) {
        element.ID -= 1;
      }
    });
  }

  getIndex(id: number) {
    let count = 0;
    for (let event of this.eventData) {
      if (event.ID != id) {
        count++;
      }
      if (event.ID == id) {
        break;
      }
    }
    return count;
  }

  addCard() {
    this.count += 1
    const newCard = new EventCardComponent(this.dataService, this.departmentService, this.userService, this.speakerService);
    this.events.push(newCard)
  }

  ngOnInit(): void {
    this.addCard();
    //this.getCourses();
    //this.getDepartments();
    //console.log(this.userService.getUserData());
  }

  ngAfterViewChecked() {
    this.checkEventFormDirty();
  }

  checkEventFormDirty() {
    for(let eventCard of this.eventCardComponents.toArray())
      this.isEventFormDirty = eventCard.eventForm.dirty;
  }

  getHttpOptions() {

    const trimmedHeader = this.userService.getAuthHeader().split(':');
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: trimmedHeader[1]
      })
    };
    return httpOptions;
  }

  saveEvents() {
    this.isEventCreating = true;

    this.printInputs();

    const eventParams: RequestParams = new RequestParams();
    eventParams.EndPoint = "event";
    eventParams.requestType = 4;
    eventParams.AuthToken = this.getHttpOptions();

    for (let data of this.processEventData()) {

      eventParams.body = data;
      this.dataService.httprequest(eventParams)
        .subscribe(async (data: string) => {
          await console.log(data);
          await this.clearEventData();

          this.isEventCreating = false;
          alert("Event/s created successfully");

          this.router.navigateByUrl('/homescreen/events');
        }, (er: HttpErrorResponse) => {
          this.dataService.handleError(er)
          this.isEventCreating = false;
        });
    }
  }

  clearEventData(){
    this.events=[];
    this.eventData=[];
    this.addCard();
  }

  printInputs(): void{
    console.log(this.events)
    console.log(this.eventData)
    //console.log(this.processEventData()[0]);
  }
}
