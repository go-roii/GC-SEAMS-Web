import { Component, HostBinding, Input, OnInit } from '@angular/core';
import {EventsToAdd} from "../../../models/EventsToAdd";
import {Time} from "@angular/common";

@Component({
  selector: 'events-event-card',
  templateUrl: './events-event-card.component.html',
  styleUrls: ['./events-event-card.component.scss']
})
export class EventsEventCardComponent implements OnInit {

  @HostBinding('className') componentClass = '';
  @Input() item!: EventsToAdd;
  eventDate!: Date;
  eventEndDate!: Date;

  constructor() {}


  ngOnInit(): void {

    const zonedEndDateTimeArr=this.item.event_end_date.split('[')
    const zonedEndDateTimeString=zonedEndDateTimeArr[0].toString();

    const zonedDateTimeArr=this.item.event_start_date.split('[')
    const zonedDateTimeString=zonedDateTimeArr[0].toString();

    this.eventDate=new Date(zonedDateTimeString);

    this.eventEndDate=new Date(zonedEndDateTimeString);
    this.componentClass = `col-xl-3 col-lg-4 col-md-6 col-sm-12 ${this.item}`;
  }

}
