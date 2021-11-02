import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'events-event-card',
  templateUrl: './events-event-card.component.html',
  styleUrls: ['./events-event-card.component.scss']
})
export class EventsEventCardComponent implements OnInit {

  @HostBinding('className') componentClass: string;

  constructor() {
    this.componentClass = 'col-xl-3 col-lg-4 col-md-6 col-sm-12';
   }

  ngOnInit(): void {
  }

}
