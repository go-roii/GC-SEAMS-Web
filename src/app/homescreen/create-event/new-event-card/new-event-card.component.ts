import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-event-card',
  templateUrl: './new-event-card.component.html',
  styleUrls: [
    './new-event-card.component.scss',
    '../create-event.component.scss'
  ]
})
export class NewEventCardComponent implements OnInit {

  // @HostBinding('className') componentClass: string;

  constructor() {
    // this.componentClass = 'card-container';
   }

  ngOnInit(): void {
  }

}
