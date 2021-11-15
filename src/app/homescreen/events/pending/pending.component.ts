import { Component, HostBinding, OnInit } from '@angular/core';
import { SidenavExpandService } from 'src/app/services/sidenav-expand.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})

export class PendingComponent implements OnInit {

  currentItem = 'pending';
  isSidenavExpanded: boolean = this.sidedenavExpandService.isSidenavExpanded;
  @HostBinding('className') componentClass: string = this.isSidenavExpanded ? 'row g-3' : 'row g-4';
  
  constructor(private sidedenavExpandService: SidenavExpandService) {
    this.sidedenavExpandService.sidenavExpandChange.subscribe((value) => {
      this.isSidenavExpanded = value;
      this.isSidenavExpanded ? this.componentClass = 'row g-3' : this.componentClass = 'row g-4';
    });
  }


  ngOnInit(): void {
  }

}
