import { Component, HostBinding, Input, OnInit } from '@angular/core';
import {EventsToAdd} from "../../../models/EventsToAdd";
import {Time} from "@angular/common";

@Component({
  selector: 'events-event-card',
  templateUrl: './events-event-card.component.html',
  styleUrls: ['./events-event-card.component.scss']
})
export class EventsEventCardComponent implements OnInit {

  isEditable: boolean = false;

  @Input() item!: EventsToAdd;
  eventDate!: Date;
  eventEndDate!: Date;
  eventUUID!: string;

	eventPosterColor!: string;
  currentDate = new Date;
  eventDurationTime!: number;
  eventCurrentTime!: number;
  currentProgress!: number;

  constructor() {}

  ngOnInit(): void {
    this.eventUUID=this.item.event_uuid;

    const zonedEndDateTimeArr=this.item.event_end_date.split('[')
    const zonedEndDateTimeString=zonedEndDateTimeArr[0].toString();

    const zonedDateTimeArr=this.item.event_start_date.split('[')
    const zonedDateTimeString=zonedDateTimeArr[0].toString();

    this.eventDate=new Date(zonedDateTimeString);

    this.eventEndDate=new Date(zonedEndDateTimeString);

		//event poster
		if(this.item.seminar_hours <= 10)
			this.eventPosterColor = '#FEC84D';
		else if(this.item.seminar_hours <= 50)
			this.eventPosterColor = '#00B1B0';
		else
			this.eventPosterColor = '#FF8370';

    // make event editable if the event is upcoming
      this.isEditable = new Date < this.eventDate;


		// progress bar
    this.eventDurationTime = (this.eventEndDate.getTime() - this.eventDate.getTime()) / 60000;
    this.eventCurrentTime = Math.round((this.currentDate.getTime() - this.eventDate.getTime()) / 60000) / this.eventDurationTime;

    if(Math.trunc(this.eventCurrentTime * 100) > 0 && Math.trunc(this.eventCurrentTime * 100) < 100)
      this.currentProgress = Math.trunc(this.eventCurrentTime * 100);
    else if(Math.trunc(this.eventCurrentTime * 100) <= 0)
      this.currentProgress = 0;
    else
      this.currentProgress = 100;

    // if(this.currentProgress > 0 && this.currentProgress != 100)
    //   setInterval(() => {
    //     this.currentDate = new Date;

    //     this.eventDurationTime = (this.eventEndDate.getTime() - this.eventDate.getTime()) / 60000
    //     this.eventCurrentTime = Math.round((this.currentDate.getTime() - this.eventDate.getTime()) / 60000) / this.eventDurationTime

    //     if(Math.trunc(this.eventCurrentTime * 100) < 100)
    //       this.currentProgress = Math.trunc(this.eventCurrentTime * 100)
    //     else
    //       this.currentProgress = 100

    //     console.log(this.currentProgress)
    //   }, 60000);

    console.log('event duration: ' + this.eventDurationTime + 'min');
    console.log('event progress: ' + this.currentProgress + '%');
  }
}
