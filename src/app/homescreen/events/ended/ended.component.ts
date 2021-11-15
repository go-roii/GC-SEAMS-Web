import { Component, HostBinding, OnInit } from '@angular/core';
import { SidenavExpandService } from 'src/app/services/sidenav-expand.service';

@Component({
  selector: 'app-ended',
  templateUrl: './ended.component.html',
  styleUrls: ['./ended.component.scss']
})

export class EndedComponent implements OnInit {

  currentItem = 'ended';
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
