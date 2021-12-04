import { Time } from "@angular/common";
import {Speaker} from "./Speaker";
import {Departments} from "./Departments";

export class Events{
  id: number;
  eventName: string;
  eventDetails: string;
  eventDate: Date;
  eventStartTime!: Time;
  eventEndTime!: Time;
  eventSeminarHours: number;
  eventRegistrationForm: string;
  eventSpeakers: Array<Speaker>;
  departments: Array<Departments>

  constructor() {

    this.id=0;
    this.eventName='';
    this.eventDetails='';
    this.eventDate=new Date;
    this.eventStartTime;
    this.eventEndTime;
    this.eventSeminarHours=0;
    this.eventSpeakers=[];
    this.departments=[];
    this.eventRegistrationForm='';
  }

  public set EventSeminarHours(hours: number){this.eventSeminarHours=hours}
  public set ID(id: number){this.id=id;}
  public set EventName(eventName: string){this.eventName=eventName;}
  public set EventDetails(eventDetails: string){this.eventDetails=eventDetails;}
  public set EventDate(eventDate: Date){this.eventDate=eventDate;}
  public set EventStartTime(eventStartTime){this.eventStartTime=eventStartTime;}
  public set EventEndTime(eventEndTime){this.eventEndTime=eventEndTime;}
  public set EventSpeakers(eventSpeakers: Array<Speaker>){this.eventSpeakers=eventSpeakers;}
  public set Departments(departments: Array<Departments>){this.departments=departments;}
  public set EventRegistrationForm(eventRegistrationForm){this.eventRegistrationForm=eventRegistrationForm;}

  public get EventSeminarHours(){return this.eventSeminarHours}
  public get ID(){return this.id;}
  public get EventName(){return this.eventName}
  public get EventDetails(){return this.eventDetails}
  public get EventDate(){return this.eventDate}
  public get EventStartTime(){return this.eventStartTime}
  public get EventEndTime(){return this.eventEndTime}
  public get EventSpeakers(){return this.eventSpeakers}
  public get Departments(){return this.departments}
  public get EventRegistrationForm(){return this.eventRegistrationForm}

}
