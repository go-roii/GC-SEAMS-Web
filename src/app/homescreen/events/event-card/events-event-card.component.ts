import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'events-event-card',
  templateUrl: './events-event-card.component.html',
  styleUrls: ['./events-event-card.component.scss']
})
export class EventsEventCardComponent implements OnInit {

  @HostBinding('className') componentClass = '';
  @Input() item = '';

  constructor() {}

  ngOnInit(): void {
    this.componentClass = `col-xl-3 col-lg-4 col-md-6 col-sm-12 ${this.item}`;
  }

}
