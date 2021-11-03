import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

  @HostBinding('className') componentClass: string;
  currentItem = 'pending';

  constructor() {
    this.componentClass = 'row gy-4';
   }

  ngOnInit(): void {
  }

}
