import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: [
    './event-card.component.scss',
    '../create-event.component.scss'
  ]
})
export class EventCardComponent implements OnInit {

  @HostBinding('className') componentClass: string;

  constructor() {
    this.componentClass = 'card-container';
   }

  ngOnInit(): void {
  }

  profileForm = new FormGroup({});

}
