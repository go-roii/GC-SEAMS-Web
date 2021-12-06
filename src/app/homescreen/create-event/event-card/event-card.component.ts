import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
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
    '../../homescreen.component.scss',
    '../create-event.component.scss',
    './event-card.component.scss'
  ]
})

export class EventCardComponent implements OnInit, OnDestroy{

  @HostBinding('className') componentClass = 'col-lg-6';
  minDate: string =  new Date().toISOString().split('T')[0];
	startTime: Date = new Date();
	endTime: Date = new Date;

  //emitters to be used on parent component(CreateEventComponent)
  @Output() eventData = new EventEmitter<Events>();
  @Output() eventDataToDelete = new EventEmitter<Events>();

  searchText: string='';

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
    eventSeminarHours:new FormControl(''),
    eventSpeakers:new FormControl('',[Validators.required,]),
    eventRegistrationForm:new FormControl('',[Validators.required])
  });

  speakerForm: FormGroup = new FormGroup({
    speakerName:new FormControl('',[Validators.required,]),
    speakerEmail:new FormControl('',[Validators.required,Validators.email]),
    speakerDescription:new FormControl('',[Validators.required,]),
  })

  chosenDepartmentsList: string = '';
  chosenSpeakersList: string = '';

  constructor(private dataService: DataService,
              private departmentService: DepartmentService,
              private userService: UserService,
              private speakersService: SpeakersService) {
		console.log(Date.parse(this.minDate));
  }

	typingTimer: any;

	restrictEventDate(e: any) {
		clearTimeout(this.typingTimer);

		let currentDate = new Date().toISOString().split('T')[0]
		
		if(e.target.value) {
			this.typingTimer = setTimeout(() => {
				e.target.value = e.target.value < currentDate ? null : e.target.value
			}, 1000);
		}
	}

	restrictEventTime(e: any) {
		clearTimeout(this.typingTimer);

		let hour = parseInt(e.target.value.split(":")[0]);

		// school hours 8am - 8pm ?
		if(e.target.value) {
			this.typingTimer = setTimeout(() => {
				e.target.value = hour >= 8 && hour <= 20 ? e.target.value : null
			}, 1000);
		}
		
		this.startTime = new Date(this.event.eventDate + 'T' + this.event.eventStartTime + ':00');
		this.endTime = new Date(this.event.eventDate + 'T' + this.event.eventEndTime + ':00');
	}

  addSpeaker(value: Speaker){
    value.speaker_chosen=true;
    this.chosenSpeaker.push(value);
    console.log(this.chosenSpeaker);
  }

  getSpeakerIndex(id:number){
    let count=0;
    for(let speaker of this.chosenSpeaker){
      if(speaker.speaker_id!=id){
        count++;
      }
      if(speaker.speaker_id==id){
        break;
      }
    }

    return count;
  }

  removeSpeakerFromChosen(speaker: Speaker){
    speaker.speaker_chosen=false;
    const index=this.getSpeakerIndex(speaker.speaker_id)
    this.chosenSpeaker.splice(index, 1)
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
    var chosenDepartmentsArray = [];
    this.chosenDepartmentsList = '';

    for (var k in this.chosenDepartments) {
      if (this.chosenDepartments.hasOwnProperty(k)) {
        chosenDepartmentsArray.push(this.chosenDepartments[k].department_code);
        this.chosenDepartmentsList = chosenDepartmentsArray.join(', ');
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

    this.speakerForm.reset()
  }

  saveSpeaker(){
    this.event.eventSpeakers=this.chosenSpeaker;

    // show selected speakers in field
    let chosenSpeakersArray = [];
    this.chosenSpeakersList = '';

    for (let k in this.chosenSpeaker) {
      if (this.chosenSpeaker.hasOwnProperty(k)) {
        chosenSpeakersArray.push(this.chosenSpeaker[k].speaker_name);
        this.chosenSpeakersList = chosenSpeakersArray.join(', ');
      }
    }
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
    this.speakers=this.speakersService.getSpeakers();
    this.departments=this.departmentService.getDepartments();
    this.addNewEvent();

    console.log("departments: "+this.departments);
    console.log("speakers: "+this.speakers);
    this.event.departments=this.chosenDepartments;
    this.event.eventSpeakers=this.chosenSpeaker;

		console.log(false || false)
  }

	// initialize date and time
	ngAfterViewInit() {
		let currentDate = new Date();
		let startTime = '';
		let endTime = '';

		currentDate = new Date(currentDate.getTime() + 86400000);

		if(currentDate.getHours() >= 20) {
			startTime = '16:00';
			endTime = '17:00';
		}
		else {
			startTime = currentDate.getHours() + ":00";
			endTime = currentDate.getHours() + 1 + ":00";
		}

		Promise.resolve().then(() => {
			this.eventForm.patchValue({
				eventDate: currentDate.toISOString().split('T')[0],
				eventStartTime: startTime,
				eventEndTime: endTime,
				// eventSeminarHours: 1
			})
		});

		console.log(this.eventForm.get('eventDate')?.value)
		console.log(this.eventDate)
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
