import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { Events } from 'src/app/models/Events';
import { RequestParams } from 'src/app/models/RequestParams';
import { DataService } from 'src/app/services/data.service';
import { Departments } from 'src/app/models/Departments';
import {DepartmentService} from "../../../services/department.service";
import {Speaker} from "../../../models/Speaker";
import {UserService} from "../../../services/user.service";
import {HttpHeaders} from "@angular/common/http";
import {SpeakersService} from "../../../services/speakers.service";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: [
    './event-card.component.scss',
    '../create-event.component.scss'
  ]
})

export class EventCardComponent implements OnInit, OnDestroy{

  @HostBinding('className') componentClass = '';
  eventForm!: FormGroup;

  //emitters to be used on parent component(CreateEventComponent)
  @Output() eventData = new EventEmitter<Events>();
  @Output() eventDataToDelete = new EventEmitter<Events>();
  event: Events=new Events();
  departments: Departments[]=[];
  chosenDepartments: Departments[]=[];
  newSpeaker: Speaker=new Speaker();
  speakers: Speaker[]=[];
  chosenSpeaker: Speaker[]=[];

  constructor(private dataService: DataService,
              private departmentService: DepartmentService,
              private userService: UserService,
              private speakersService: SpeakersService) {
  }

  addSpeaker(value: Speaker){
    this.chosenSpeaker.push(value);
    console.log(this.chosenSpeaker);
  }

  onNativeChange(e: any, department: Departments) {
    if(e.target.checked){
      console.log("added "+department.department_id);
      this.addChosenDepartment(department)
    }
    if(!(e.target.checked)){
      console.log("removed "+department.department_id);
      this.removeDepartmentFromChosen(department);
    }

    this.printChosenDepartment();
  }

  printChosenDepartment(){
    console.log(this.chosenDepartments)
  }

  removeDepartmentFromChosen(department: Departments){
    const index=this.getDepartmentIndex(department.department_id)
    this.chosenDepartments.splice(index, 1)
  }

  getDepartmentIndex(id:number){
    let count=0;
    for(let department of this.chosenDepartments){
      if(department.department_id!=id){
        count++;
      }
      if(department.department_id==id){
        break;
      }
    }

    return count;
  }

  addChosenDepartment(department: Departments){
    this.chosenDepartments.push(department);
  }

  getHttpOptions(){

    const trimmedHeader=this.userService.getAuthHeader().split(':');
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: trimmedHeader[1]
      })
    };

    return httpOptions;
  }

  addNewSpeaker(){

    this.newSpeaker.SpeakerName="Everly Bayog";
    this.newSpeaker.SpeakerEmail="EverlyG@gmail.com"
    this.newSpeaker.SpeakerDescription="evslangsakalam"

    const params=new RequestParams();
    params.Body=this.newSpeaker;
    params.EndPoint="speaker";
    params.requestType=4;
    params.authToken=this.getHttpOptions();

    console.log(this.getHttpOptions());

    this.dataService.httprequest(params)
      .subscribe((data: Speaker) => this.newSpeaker = data);
    console.log(this.newSpeaker)

  }

  addNewEvent() {
    this.eventData.emit(this.event);
  }

  deleteEvent() {
    this.eventDataToDelete.emit(this.event);
  }

  // @HostBinding('className') componentClass: string;

  //Getters for validation of the fields
  get eventName() { return this.eventForm.get('eventName'); }
  get eventDetails() { return this.eventForm.get('eventDetails'); }
  get eventDate() { return this.eventForm.get('eventDate'); }
  get eventStartTime() { return this.eventForm.get('eventStartTime'); }
  get eventEndTime() { return this.eventForm.get('eventEndTime'); }
  get eventSpeakers() { return this.eventForm.get('eventSpeakers'); }
  get eventRegistrationForm() { return this.eventForm.get('eventRegistrationForm'); }

  ngOnInit(): void {

    this.componentClass = 'col-lg-6 col-md-12';
    this.eventForm = new FormGroup({
      eventName:new FormControl('',[Validators.required,]),
      eventDetails:new FormControl('',Validators.required,),
      eventDate:new FormControl('',[Validators.required,]),
      eventStartTime:new FormControl('',[Validators.required,]),
      eventEndTime:new FormControl('',[Validators.required,]),
      eventSpeakers:new FormControl('',[Validators.required,]),
      eventRegistrationForm:new FormControl('',[Validators.required])
    });

    //department service will be loaded if not yet
    if(!this.departmentService.isLoaded){
      this.fetchDepartments()
      this.departmentService.isLoaded=true;
    }

    if(!this.speakersService.IsLoaded){
      this.fetchSpeakers();
      this.speakersService.IsLoaded=true;
    }

    this.speakers=this.speakersService.getSpeakers();
    this.departments=this.departmentService.getDepartments();
    this.addNewEvent();

    console.log("departments: "+this.departments)
    console.log("speakers: "+this.speakers)
    this.event.departments=this.chosenDepartments;
    this.event.eventSpeakers=this.chosenSpeaker;
  }

  ngOnDestroy(): void {
    this.deleteEvent();
  }

  fetchDepartments(){
    const departmentParams= new RequestParams();
    departmentParams.EndPoint="departments";
    departmentParams.RequestType=1;

    this.dataService.httprequest(departmentParams)
      .subscribe((data: Departments[]) => this.departmentService.setDepartments(data));
  }

  fetchSpeakers(){
    const speakerParams= new RequestParams();
    speakerParams.EndPoint="speakers";
    speakerParams.RequestType=5;
    speakerParams.AuthToken=this.getHttpOptions();

    this.dataService.httprequest(speakerParams)
      .subscribe((data: Speaker[]) => this.speakersService.setSpeakers(data));
  }
}
