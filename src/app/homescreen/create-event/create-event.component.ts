import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Events } from 'src/app/models/Events';
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

  constructor(private router: Router) {
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
  }

}
