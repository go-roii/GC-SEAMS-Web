import { Component, HostBinding, Input, OnInit } from '@angular/core';
import {EventsToAdd} from "../../../models/EventsToAdd";
import {Time} from "@angular/common";

@Component({
  selector: 'events-event-card',
  templateUrl: './events-event-card.component.html',
  styleUrls: ['./events-event-card.component.scss']
})
export class EventsEventCardComponent implements OnInit {

  @Input() item!: EventsToAdd;
  eventDate!: Date;
  eventEndDate!: Date;

  currentDate = new Date;
  eventDurationTime!: number;
  eventCurrentTime!: number;
  currentProgress!: number;

  seminarHours!: string;

  constructor() {}


  ngOnInit(): void {

    const zonedEndDateTimeArr=this.item.event_end_date.split('[')
    const zonedEndDateTimeString=zonedEndDateTimeArr[0].toString();

    const zonedDateTimeArr=this.item.event_start_date.split('[')
    const zonedDateTimeString=zonedDateTimeArr[0].toString();

    this.eventDate=new Date(zonedDateTimeString);

    this.eventEndDate=new Date(zonedEndDateTimeString);

    this.eventDurationTime = (this.eventEndDate.getTime() - this.eventDate.getTime()) / 60000
    this.eventCurrentTime = Math.round((this.currentDate.getTime() - this.eventDate.getTime()) / 60000) / this.eventDurationTime

    if(Math.trunc(this.eventCurrentTime * 100) > 0 && Math.trunc(this.eventCurrentTime * 100) < 100) 
      this.currentProgress = Math.trunc(this.eventCurrentTime * 100)
    else if(Math.trunc(this.eventCurrentTime * 100) <= 0)
      this.currentProgress = 0
    else
      this.currentProgress = 100

    this.seminarHours = this.getSeminarHours(this.eventDurationTime)

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

    console.log('event duration: ' + this.eventDurationTime + 'min')
    console.log('event progress: ' + this.currentProgress + '%')
  }

  getSeminarHours(num: number) {
    var hours = (num / 60)

    return (num / 60).toFixed(1) + ' hr'
  }

}
