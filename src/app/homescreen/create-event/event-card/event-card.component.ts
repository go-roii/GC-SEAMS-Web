import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { Events } from 'src/app/models/Events';

@Component({
  selector: 'app-event-card',
  providers:[Events],
  templateUrl: './event-card.component.html',
  styleUrls: [
    './event-card.component.scss',
    '../create-event.component.scss'
  ]
})

export class EventCardComponent implements OnInit {

  eventForm!: FormGroup;
  @Output() eventData = new EventEmitter<Events>();
  event: Events=new Events()

  addNewEvent() {
    this.event.eventName=this.eventForm.controls['eventName'].value;
    this.eventData.emit(this.event);
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

  printInputs(){
  }
}
