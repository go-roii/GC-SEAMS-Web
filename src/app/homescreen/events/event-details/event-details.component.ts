import {Location} from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Events} from "../../../models/Events";
import {Departments} from "../../../models/Departments";
import {Speaker} from "../../../models/Speaker";
import {DepartmentService} from "../../../services/department.service";
import {RequestParams} from "../../../models/RequestParams";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {UserService} from "../../../services/user.service";
import {DataService} from "../../../services/data.service";
import {SpeakersService} from "../../../services/speakers.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {EventsToAdd} from "../../../models/EventsToAdd";
import { UpdatedEventService } from 'src/app/services/updated-event.service';
import {QRCodeDetails} from "../../../models/QRCodeDetails";
import {Student} from "../../../models/Student";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: [
    '../../homescreen.component.scss',
    './event-details.component.scss'
  ]
})

export class EventDetailsComponent implements OnInit {

  isEventUpdating: boolean = false;

	@ViewChild("eventContentColumn") eventContentColumn?: ElementRef;
	attendanceColumnHeight!: number;

  private activeEventUUID!: Subscription;
  isEditable: boolean = false;
  uuid!: string;
  registeredStudents!: Student[];
  attendedStudents!: Student[];
  presentCount: number=0;
  registeredCount: number=0;
  absentCount: number=0;

	enableEndQRCodeLink: boolean = true;

  minDate: string =  new Date().toISOString().split('T')[0];
  startTime: Date = new Date();
	endTime: Date = new Date;
  beginQRCodeLink: string = '';
  endQRCodeLink: string = '';
  qrCodeID: string = '';
  searchText: string='';
  dateString: string='';

  event: Events=new Events();
  departments: Departments[]=[];
  chosenDepartments: Departments[]=[];
  speakers: Speaker[]=[];
  chosenSpeaker: Speaker[]=[];
  speaker!: Speaker;

  chosenDepartmentsList: string = '';
  chosenSpeakersList: string = '';

  initialEventForm: any;

  setFieldValues(event: EventsToAdd){
    this.eventName=event.event_title;
    this.eventDetails=event.event_description;
    this.eventDate=this.getEventDate(event);
    this.eventStartTime=this.getEventStartTime(event);
    this.eventEndTime=this.getEventEndTime(event);
    this.eventSeminarHours=event.seminar_hours;
    this.eventRegistrationForm=event.registration_link
    // this.eventIsStrict=event.is_attendance_strict
  }

  eventForm: FormGroup=new FormGroup({
    eventName:new FormControl('',[Validators.required,]),
    eventDetails:new FormControl('',Validators.required,),
    eventDate:new FormControl('',[Validators.required,]),
    eventStartTime:new FormControl('',[Validators.required,]),
    eventEndTime:new FormControl('',[Validators.required,]),
    eventSpeakers:new FormControl('',[Validators.required,]),
    eventSeminarHours:new FormControl('',[Validators.required,]),
    eventIsStrict: new FormControl(''),
    eventRegistrationForm:new FormControl('',[Validators.required])
  });

  set eventName(value: string){this.eventForm.controls['eventName'].setValue(value)}
  set eventDetails(value: string){this.eventForm.controls['eventDetails'].setValue(value)}
  set eventDate(value: string){this.eventForm.controls['eventDate'].setValue(value)}
  set eventStartTime(value: string){this.eventForm.controls['eventStartTime'].setValue(value)}
  set eventEndTime(value: string){this.eventForm.controls['eventEndTime'].setValue(value)}
  set eventSpeakers(value: string){this.eventForm.controls['eventName'].setValue(value)}
  set eventSeminarHours(value: number){this.eventForm.controls['eventSeminarHours'].setValue(value)}
  set eventIsStrict(value: string){this.eventForm.controls['eventIsStrict'].setValue(value)}
  set eventRegistrationForm(value: string){this.eventForm.controls['eventRegistrationForm'].setValue(value)}

  get eventName(){ return this.eventForm.controls['eventName'].value}
  get eventDetails(){return this.eventForm.controls['eventDetails'].value}
  get eventDate(){return this.eventForm.controls['eventDate'].value}
  get eventStartTime(){return this.eventForm.controls['eventStartTime'].value}
  get eventEndTime(){return this.eventForm.controls['eventEndTime'].value}
  get eventSpeakers(){return this.eventForm.controls['eventName'].value}
  get eventSeminarHours(){return this.eventForm.controls['eventSeminarHours'].value}
  get eventIsStrict(){return this.eventForm.controls['eventIsStrict'].value}
  get eventRegistrationForm(){return this.eventForm.controls['eventRegistrationForm'].value}



  speakerForm: FormGroup = new FormGroup({
    speakerName:new FormControl('',[Validators.required,]),
    speakerEmail:new FormControl('',[Validators.required,Validators.email]),
    speakerDescription:new FormControl('',[Validators.required,]),
  })

  editActiveEvent(uuid: string){

    this.isEventUpdating = true;

    let strict: boolean;

    //check if the selected option is strict or not
    if(this.eventIsStrict=='strict')
      strict=true;
    else
      strict=false;

    console.log(this.eventIsStrict)

    const data: EventsToAdd = {
      event_id: 0,
      event_uuid: '',
      event_title: this.eventName,
      event_description: this.eventDetails,
      event_start_date: this.eventDate + 'T' + this.eventStartTime,
      event_end_date: this.eventDate + 'T' + this.eventEndTime,
      seminar_hours: this.eventSeminarHours,
      is_attendance_strict: strict,
      timezone_id: 'Asia/Manila',
      registration_link: this.eventRegistrationForm,
      departments: this.chosenDepartments,
      speakers: this.chosenSpeaker
    }

    console.log("data.department----------------------------");
    console.log(data.departments);
    console.log("data.department----------------------------");

    console.log(data)

    const eventParams: RequestParams = new RequestParams();
    eventParams.EndPoint = "event/"+uuid;
    eventParams.requestType = 6;
    eventParams.body=data;
    eventParams.AuthToken = this.getHttpOptions();

    this.dataService.httprequest(eventParams)
      .subscribe(async (data: string) => {
        await console.log(data);
        await this.getEventDetails(this.uuid);

        this.isEventUpdating = false;
        alert("Event/s updated successfully");

        this.location.back();
      }, (er: HttpErrorResponse) => {
        this.dataService.handleError(er)
        this.isEventUpdating = false;
      });


    this.updatedEvent.updatedEventUUID = uuid;
  }

  get speakerName() { return this.speakerForm.get('speakerName'); }
  get speakerEmail() { return this.speakerForm.get('speakerEmail'); }
  get speakerDescription() { return this.speakerForm.get('speakerDescription'); }

  constructor(private updatedEvent: UpdatedEventService,
              private location: Location,
              private departmentService: DepartmentService,
              private userService: UserService,
              private dataService: DataService,
              private speakersService: SpeakersService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeEventUUID = this.route.params.subscribe(params => {
      this.uuid = params['uuid'];
    });
    console.log(this.uuid);

    this.getEventDetails(this.uuid);

    this.speakers=this.speakersService.getSpeakers();
    this.departments=this.departmentService.getDepartments();

    console.log(this.event.eventIsStrict);
  }

  getEventDetails(uuid: string){
    const eventDetailsParams=new RequestParams();
    eventDetailsParams.EndPoint='event/'+uuid;
    eventDetailsParams.requestType=5;
    eventDetailsParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(eventDetailsParams)
      .subscribe(async (data: EventsToAdd) =>{
        await this.setActiveEvent(data);
        await this.setAttendanceStrictness(data);
        await this.getRegisteredStudents(uuid)
                  .then(() => {this.getAttendedStudents(uuid)});
        await this.regenerateQRCodeLink(uuid)

        console.log(data.is_attendance_strict)

        this.initialEventForm = this.eventForm.value
      }, (er: HttpErrorResponse) => {
      this.dataService.handleError(er);
    });
  }

  setAttendanceStrictness(data: EventsToAdd){
    if(data.is_attendance_strict)
      this.eventIsStrict='strict';
    else
      this.eventIsStrict='notStrict';
  }

  async getRegisteredStudents(uuid: string){
    const registeredStudentParams=new RequestParams();
    registeredStudentParams.EndPoint='event/registered/'+uuid;
    registeredStudentParams.requestType=5;
    registeredStudentParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(registeredStudentParams)
      .subscribe(async (data: Student[]) =>{
        await this.setRegisteredStudents(data);
        await console.log('registered: ----------')
        await console.log(data)

        this.initialEventForm = this.eventForm.value
      }, (er: HttpErrorResponse) => {
        this.dataService.handleError(er);
      });
  }

  setRegisteredStudents(data: Student[]){
    this.registeredStudents =  data;
  }

  processStudentsData(){
    for(let registrant of this.registeredStudents){
      this.registeredCount+=1;
      for(let attendee of this.attendedStudents){
        if(registrant.id == attendee.id){
          registrant.is_present=true;
          this.presentCount+=1;
          break;
        }
      }
    }
    this.absentCount=this.registeredCount-this.presentCount;
    console.log("Data Processing completed");
    console.log(this.registeredStudents)
  }

  getAttendedStudents(uuid: string){

    const attendedStudentParams=new RequestParams();
    attendedStudentParams.EndPoint='event/attended/'+uuid;
    attendedStudentParams.requestType=5;
    attendedStudentParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(attendedStudentParams)
      .subscribe(async (data: Student[]) =>{
        await this.setAttendedStudents(data);
        await this.processStudentsData();
        await console.log('Attended: ----------')
        await console.log(data)

        this.initialEventForm = this.eventForm.value
      }, (er: HttpErrorResponse) => {
        this.dataService.handleError(er);
      });
  }

  setAttendedStudents(data: Student[]){
    this.attendedStudents =  data;
  }

  setActiveEvent(data: EventsToAdd){

    this.event.eventName=data.event_title;
    this.event.eventDetails=data.event_description;
    this.event.eventSeminarHours=data.seminar_hours;
    this.chosenDepartments=data.departments;
    this.chosenSpeaker=data.speakers
    this.event.eventRegistrationForm=data.registration_link;


    //mark the department as chosen in departments
    for(let department of this.departments){
      for(let dep of this.chosenDepartments){
        if(department.department_id==dep.department_id){
          department.department_chosen=true;
          break;
        }
      }
    }

    //mark the speaker as chosen in speakers
    for(let speaker of this.speakers){
      for(let spkr of this.chosenSpeaker){
        if(speaker.speaker_id==spkr.speaker_id){
          speaker.speaker_chosen=true;
          break;
        }
      }
    }

    this.populateDepartmentField();
    this.populateSpeakersField();

    this.setFieldValues(data)

    // set date and time to event preview
    this.eventDate = data.event_start_date.split("T")[0];
    this.startTime = new Date(data.event_start_date.split("[")[0]);
    this.endTime = new Date(data.event_end_date.split("[")[0]);

    // disable qr code extent select field
    if(this.isEditable)
      this.eventForm.controls.eventIsStrict.enable()
    else
      this.eventForm.controls.eventIsStrict.disable()
  }

  getEventDate(data: EventsToAdd){
    const zonedStartDateTimeArr=data.event_start_date.split('[');
    const zonedStartDateTimeString=zonedStartDateTimeArr[0].toString();

    // const zonedEndDateTimeArr=invitation.event_start_date.split('[');
    // const zonedEndDateTimeString=zonedEndDateTimeArr[0].toString();

    let dateArr = zonedStartDateTimeString.split('-');
    const year = dateArr[0]
    const month = dateArr[1]
    const day = dateArr[2].split("T")[0];

    return year+'-'+month+'-'+day
  }

  getEventStartTime(data: EventsToAdd) {
    const zonedStartDateTimeArr=data.event_start_date.split('[');
    const zonedStartDateTimeString=zonedStartDateTimeArr[0].toString();

    // const zonedEndDateTimeArr=invitation.event_start_date.split('[');
    // const zonedEndDateTimeString=zonedEndDateTimeArr[0].toString();

    const date: Date = new Date(zonedStartDateTimeString);
    const hour= date.getHours();
    const minutes= date.getMinutes();

    // make event editable if the event is upcoming
    this.isEditable = new Date < date;

    return hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+':'+minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+':00';
  }

  getEventEndTime(data: EventsToAdd){

    const zonedEndDateTimeArr=data.event_end_date.split('[');
    const zonedEndDateTimeString=zonedEndDateTimeArr[0].toString();

    const date: Date = new Date(zonedEndDateTimeString);
    const hour= date.getHours();
    const minutes= date.getMinutes();

    return hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+':'+minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+':00';
  }

  removeDepartmentFromChosen(department: Departments){
    department.department_chosen=false;
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
    department.department_chosen=true;
    this.chosenDepartments.push(department);
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

    this.populateDepartmentField();

    this.printChosenDepartment();
  }

  populateDepartmentField(){
    // show selected departments in field
    let chosenDepartmentsArray = [];
    this.chosenDepartmentsList = '';

    for (let k in this.chosenDepartments) {
      if (this.chosenDepartments.hasOwnProperty(k)) {
        chosenDepartmentsArray.push(this.chosenDepartments[k].department_code);
        this.chosenDepartmentsList = chosenDepartmentsArray.join(', ');
      }
    }
  }

  printChosenDepartment(){
    console.log(this.chosenDepartments)
  }

  ngDoCheck() {
    setTimeout(() => {
      this.attendanceColumnHeight = this.eventContentColumn?.nativeElement.clientHeight + 36;
    }, 0);
  }

	ngAfterViewInit() {
    setTimeout(() => {
      this.attendanceColumnHeight = this.eventContentColumn?.nativeElement.clientHeight + 36;
    }, 0);
	}

	typingTimer: any;
  typingDuration: number = 500;

	restrictEventDate(e: any) {
		clearTimeout(this.typingTimer);

		let currentDate = new Date().toISOString().split('T')[0]

		if(e.target.value) {
			this.typingTimer = setTimeout(() => {
        if(e.target.value < currentDate) {
          e.target.value = null
          e.target.classList.add("is-invalid")
        }
        else {
          e.target.value = e.target.value
          e.target.classList.remove("is-invalid")
        }
			}, this.typingDuration);
		}
	}

	restrictEventTime(e: any) {
		clearTimeout(this.typingTimer);

		let hour = parseInt(e.target.value.split(":")[0]);

		// school hours 8am - 8pm ?
		if(e.target.value) {
			this.typingTimer = setTimeout(() => {
				// e.target.value = hour >= 8 && hour <= 20 ? e.target.value : null

        if(hour >= 8 && hour <= 20) {
          e.target.value = e.target.value
          e.target.classList.remove("is-invalid")
        }
        else {
          e.target.value = null
          e.target.classList.add("is-invalid")
        }
			}, this.typingDuration);
		}

    this.startTime = new Date(this.event.eventDate + 'T' + this.event.eventStartTime + ':00');
		this.endTime = new Date(this.event.eventDate + 'T' + this.event.eventEndTime + ':00');
	}

	// onNativeChange(e: any) {
	// 	this.enableEndQRCodeLink = e.target.checked
  // }

  generateBeginQRCodeLink(uuid: string) {

    let qrDetails: QRCodeDetails;

    const qrLinkParams=new RequestParams();
    qrLinkParams.EndPoint='event/attendance/'+uuid;
    qrLinkParams.requestType=5;
    qrLinkParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(qrLinkParams)
      .subscribe(async (data: QRCodeDetails) =>{
        qrDetails = data;
        await console.log(data)
        this.beginQRCodeLink = location.origin + '/qr-code'+'/'+qrDetails.event_uuid+'/'+qrDetails.attendance_code+'/'+this.event.eventName;
      }, (er: HttpErrorResponse) => {
        this.dataService.handleError(er);
      });
  }

  generateEndQRCodeLink(uuid: string) {

    let qrDetails: QRCodeDetails;

    const qrLinkParams=new RequestParams();
    qrLinkParams.EndPoint='event/attendance/'+uuid;
    qrLinkParams.requestType=5;
    qrLinkParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(qrLinkParams)
      .subscribe(async (data: QRCodeDetails) =>{
        qrDetails = data;
        await console.log(data)
        this.endQRCodeLink = location.origin + '/qr-code' +'/'+ qrDetails.event_uuid+'/'+qrDetails.attendance_code+'/'+this.event.eventName;
      }, (er: HttpErrorResponse) => {
        this.dataService.handleError(er);
      });

  }

  regenerateQRCodeLink(uuid: string){

    let qrDetails: QRCodeDetails;

    try{
      const beginningQrLinkParams=new RequestParams();
      beginningQrLinkParams.EndPoint='event/attendance/'+uuid;
      beginningQrLinkParams.requestType=5;
      beginningQrLinkParams.authToken=this.getHttpOptions();

      try{
        this.dataService.httprequest(beginningQrLinkParams)
          .subscribe(async (data: QRCodeDetails) =>{
            qrDetails = data;
            await console.log(data)
            this.beginQRCodeLink = location.origin + '/qr-code'+'/'+qrDetails.event_uuid+'/'+qrDetails.attendance_code+'/'+this.event.eventName;
          });
      }catch (e) {

      }

      const qrLinkParams=new RequestParams();
      qrLinkParams.EndPoint='event/attendance/'+uuid;
      qrLinkParams.requestType=5;
      qrLinkParams.authToken=this.getHttpOptions();

      try{
        this.dataService.httprequest(qrLinkParams)
          .subscribe(async (data: QRCodeDetails) =>{
            qrDetails = data;
            await console.log(data)
            this.endQRCodeLink = location.origin + '/qr-code' +'/'+ qrDetails.event_uuid+'/'+qrDetails.attendance_code+'/'+this.event.eventName;
          });
      }catch (e){}
    }catch (e) {}
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

  //get the speakers from speakers service and assign to the speakers property
  setSpeakers(){
    this.speakers=this.speakersService.getSpeakers();
  }

  //get the headers to be used in the request
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

  //set the chosen speakers as the speaker for the event
  saveSpeaker(){
    this.event.eventSpeakers=this.chosenSpeaker;
    this.populateSpeakersField();
  }

  populateSpeakersField(){
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

  generateBeginQRCode(uuid: string){

    const body = {
      event_uuid: uuid
    }

    const qrParams=new RequestParams();
    qrParams.EndPoint='event/attendance/beginning';
    qrParams.requestType=4;
    qrParams.body=body;
    qrParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(qrParams)
      .subscribe(async (data: string) => {
        await console.log(data);
        await this.generateBeginQRCodeLink(uuid)
        await alert("Beginning QR code generated");
      }, (er: HttpErrorResponse) => {
        this.dataService.handleError(er);
      });

  }

  generateEndQRCode(uuid: string){

    const body = {
      event_uuid: uuid
    }

    const qrParams=new RequestParams();
    qrParams.EndPoint='event/attendance/end';
    qrParams.requestType=4;
    qrParams.body=body;
    qrParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(qrParams)
      .subscribe(async (data: string) => {
        await console.log(data);
        await this.generateEndQRCodeLink(uuid)
        await alert("Beginning QR code generated");
      }, (er: HttpErrorResponse) => {
        this.dataService.handleError(er);
      });

  }


}
