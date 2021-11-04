import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Events } from 'src/app/models/Events';
import { EventsComponent } from '../events/events.component';
import { EventCardComponent } from './event-card/event-card.component';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  count = 0;
  events: EventCardComponent[]=[];
  eventData: Events[] = []

    // @HostBinding('className') componentClass: string;

  constructor() {
  }

  addEventData(newEvent: Events) {
    newEvent.id=this.count
    this.eventData.push(newEvent);
  }

   addCard(){
    this.count=this.count+1
    const newCard= new EventCardComponent();
    this.events.push(newCard)
   }

  ngOnInit(): void {
    this.addCard();
  }

  printInputs(): void{
    console.log(this.eventData)
    this.resetEventData();
  }

  resetEventData(): void{
    this.eventData=[]
    this.events=[]
  }

}
