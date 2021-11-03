import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-ongoing',
  templateUrl: './ongoing.component.html',
  styleUrls: ['./ongoing.component.scss']
})
export class OngoingComponent implements OnInit {

  @HostBinding('className') componentClass: string;
  @HostBinding('attr.id') componentId: string;

  constructor() {
    this.componentClass = 'row gy-4';
    this.componentId = 'ongoing';
   }

  ngOnInit(): void {
  }

}
