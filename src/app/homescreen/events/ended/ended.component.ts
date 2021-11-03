import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-ended',
  templateUrl: './ended.component.html',
  styleUrls: ['./ended.component.scss']
})
export class EndedComponent implements OnInit {

  @HostBinding('className') componentClass: string;
  @HostBinding('attr.id') componentId: string;

  constructor() {
    this.componentClass = 'row gy-4';
    this.componentId = 'ended';
   }

  ngOnInit(): void {
  }

}
