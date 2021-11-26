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
import {UserProfile} from "../../../models/UserProfile";
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";

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

  //emitters to be used on parent component(CreateEventComponent)
  @Output() eventData = new EventEmitter<Events>();
  @Output() eventDataToDelete = new EventEmitter<Events>();
  event: Events=new Events();
  departments: Departments[]=[];
  chosenDepartments: Departments[]=[];
  speakers: Speaker[]=[];
  chosenSpeaker: Speaker[]=[];

  speaker!: Speaker;

  eventForm: FormGroup=new FormGroup({
    eventName:new FormControl('',[Validators.required,]),
    eventDetails:new FormControl('',Validators.required,),
    eventDate:new FormControl('',[Validators.required,]),
    eventStartTime:new FormControl('',[Validators.required,]),
    eventEndTime:new FormControl('',[Validators.required,]),
    eventSpeakers:new FormControl('',[Validators.required,]),
    eventRegistrationForm:new FormControl('',[Validators.required])
  });

  speakerForm: FormGroup = new FormGroup({
    speakerName:new FormControl('',[Validators.required,]),
    speakerEmail:new FormControl('',[Validators.required,Validators.email]),
    speakerDescription:new FormControl('',[Validators.required,]),
  })

  chosenDepartmentsList: string[] = [];
  chosenDepartmentsList2: string = '';

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

    // show selected departments in field
    this.chosenDepartmentsList = [];
    this.chosenDepartmentsList2 = '';
    for (var k in this.chosenDepartments) {
      if (this.chosenDepartments.hasOwnProperty(k)) {
        this.chosenDepartmentsList.push(this.chosenDepartments[k].department_code);
        this.chosenDepartmentsList2 = this.chosenDepartmentsList.join(', ');
      }
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

    const newSpeaker: Speaker = new Speaker();
      newSpeaker.speaker_name=this.speakerForm.controls['speakerName'].value;
      newSpeaker.speaker_email=this.speakerForm.controls['speakerEmail'].value;
      newSpeaker.speaker_description=this.speakerForm.controls['speakerDescription'].value;

    const params=new RequestParams();
    params.Body=newSpeaker;
    params.EndPoint="speaker";
    params.requestType=4;
    params.authToken=this.getHttpOptions();

    this.dataService.httprequest(params)
      .subscribe(async (data: Speaker) =>{
        this.speaker = data
        await this.updateSpeakers();
        await this.setSpeakers();
      });

    this.setSpeakers();
    this.speakerForm.reset()
  }

  setSpeakers(){
    this.speakers=this.speakersService.getSpeakers();
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

  get speakerName() { return this.speakerForm.get('speakerName'); }
  get speakerEmail() { return this.speakerForm.get('speakerEmail'); }
  get speakerDescription() { return this.speakerForm.get('speakerDescription'); }

  ngOnInit(): void {
    this.componentClass = 'col-lg-6 col-md-12';

    this.speakers=this.speakersService.getSpeakers();
    this.departments=this.departmentService.getDepartments();
    this.addNewEvent();

    console.log("departments: "+this.departments)
    console.log("speakers: "+this.speakers)
    this.event.departments=this.chosenDepartments;
    this.event.eventSpeakers=this.chosenSpeaker;
  }

  public updateSpeakers(){
    const speakerParams= new RequestParams();
    speakerParams.EndPoint="speakers";
    speakerParams.RequestType=5;
    speakerParams.AuthToken=this.getHttpOptions();

    this.dataService.httprequest(speakerParams)
      .subscribe(async (data: Speaker[]) =>{
        this.speakers = data;
        await this.speakersService.updateSpeakers(JSON.stringify(data));
        console.log(data);
      });

    console.log(this.speakers)
  }

  ngOnDestroy(): void {
    this.deleteEvent();
  }

}
