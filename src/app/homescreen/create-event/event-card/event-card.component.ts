import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Events } from 'src/app/models/Events';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: [
    './event-card.component.scss',
    '../create-event.component.scss'
  ]
})
export class EventCardComponent implements OnInit {

  @Input() count!: Number
  @Input() event: Events = new Events()

  // @HostBinding('className') componentClass: string;

  //create form group and form controls for its fields

  eventForm = new FormGroup({
    eventName:new FormControl('',[Validators.required,]),
    eventDetails:new FormControl('',Validators.required,),
    eventDate:new FormControl('',[Validators.required,]),
    eventStartTime:new FormControl('',[Validators.required,]),
    eventEndTime:new FormControl('',[Validators.required,]),
    eventSpeakers:new FormControl('',[Validators.required,]),
    eventRegistrationForm:new FormControl('',[Validators.required]),
  });

  //Getters for validation of the fields
  get eventName() { return this.eventForm.get('eventName'); }
  get eventDetails() { return this.eventForm.get('eventDetails'); }
  get eventDate() { return this.eventForm.get('eventDate'); }
  get eventStartTime() { return this.eventForm.get('eventStartTime'); }
  get eventEndTime() { return this.eventForm.get('eventEndTime'); }
  get eventSpeakers() { return this.eventForm.get('eventSpeakers'); }
  get eventRegistrationForm() { return this.eventForm.get('eventRegistrationForm'); }

  constructor() {
    // this.componentClass = 'card-container';
   }

  ngOnInit(): void {
  }

  printInputs(){
    console.log(this.event.eventName)
    console.log(this.event.eventDetails)

  }

}
