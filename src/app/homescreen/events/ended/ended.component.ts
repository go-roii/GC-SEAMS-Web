import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-ended',
  templateUrl: './ended.component.html',
  styleUrls: ['./ended.component.scss']
})
export class EndedComponent implements OnInit {

  @HostBinding('className') componentClass: string;
  currentItem = 'ended';

  constructor() {
    this.componentClass = 'row gy-4';
   }

  ngOnInit(): void {
  }

}
