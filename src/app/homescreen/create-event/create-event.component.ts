import { Component, HostBinding, OnInit } from '@angular/core';
import { Events } from 'src/app/models/Events';
import { EventCardComponent } from './event-card/event-card.component';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  count = 0;
  events: EventCardComponent[] = []

    // @HostBinding('className') componentClass: string;

  constructor() {
    // this.componentClass = 'container-fluid';
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
    this.events.forEach(event => {
      console.log(event.eventName)
      console.log('hello nigga')
    });
  }

}
