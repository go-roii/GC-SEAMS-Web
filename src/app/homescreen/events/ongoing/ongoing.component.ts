import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ongoing',
  templateUrl: './ongoing.component.html',
  styleUrls: ['./ongoing.component.scss']
})
export class OngoingComponent implements OnInit {

  @HostBinding('className') componentClass: string;
  currentItem = 'ongoing';
  
  constructor() {
    this.componentClass = 'row gy-4';
   }

  ngOnInit(): void {
  }

}
