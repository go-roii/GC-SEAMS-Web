import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

  @HostBinding('className') componentClass: string;
  @HostBinding('attr.id') componentId: string;

  constructor() {
    this.componentClass = 'row gy-4';
    this.componentId = 'pending';
   }

  ngOnInit(): void {
  }

}
