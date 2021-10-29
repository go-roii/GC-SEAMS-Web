import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  @HostBinding('className') componentClass: string;

  constructor() {
    this.componentClass = 'container-fluid';
   }

  ngOnInit(): void {
  }

}
