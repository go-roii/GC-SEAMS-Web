import { Time } from "@angular/common";

export class Events{
  id: number;
  eventName: string;
  eventDetails: string;
  eventDate: Date;
  eventStartTime!: Time;
  eventEndTime!: Time;
  eventSpeakers: Array<string>;
  eventRegistrationForm: string;

  constructor() {

    this.id=0;
    this.eventName='';
    this.eventDetails='';
    this.eventDate=new Date;
    this.eventStartTime;
    this.eventEndTime;
    this.eventSpeakers=[];
    this.eventRegistrationForm='';

  }

  public set ID(id: number){this.id=id;}
  public set Eventname(eventName: string){this.eventName=eventName;}
  public set EventDetails(eventDetails: string){this.eventDetails=eventDetails;}
  public set EventDate(eventDate: Date){this.eventDate=eventDate;}
  public set EventStartTime(eventStartTime){this.eventStartTime=eventStartTime;}
  public set EventEndTime(eventEndTime){this.eventEndTime=eventEndTime;}
  public set EventSpeakers(eventSpeakers){this.eventSpeakers=eventSpeakers;}
  public set EventRegistrationForm(eventRegistrationForm){this.eventRegistrationForm=eventRegistrationForm;}

  public get ID(){return this.id;}
  public get Eventname(){return this.eventName}
  public get EventDetails(){return this.eventDetails}
  public get EventDate(){return this.eventDate}
  public get EventStartTime(){return this.eventStartTime}
  public get EventEndTime(){return this.eventEndTime}
  public get EventSpeakers(){return this.eventSpeakers}
  public get EventRegistrationForm(){return this.eventRegistrationForm}

}
