import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { Events } from 'src/app/models/Events';
import { RequestParams } from 'src/app/models/RequestParams';
import { DataService } from 'src/app/services/data.service';
import { Departments } from 'src/app/models/Departments';

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
  event: Events=new Events()

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

  constructor() {
  }

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

    this.addNewEvent();
  }

  ngOnDestroy(): void {
    this.deleteEvent();
  }

  printInputs(){
  }
}
