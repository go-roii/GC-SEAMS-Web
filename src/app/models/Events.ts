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

  public get ID(){return this.id;}
  public get Eventname(){return this.eventName}
  public get EventDetails(){return this.eventName}
  public get EventDate(){return this.eventName}
  public get EventStartTime(){return this.eventName}
  public get EventEndTime(){return this.eventName}
  public get EventSpeakers(){return this.eventName}
  public get EventRegistrationForm(){return this.eventName}

}
