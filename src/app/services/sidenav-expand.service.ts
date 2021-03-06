import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavExpandService {

  isSidenavExpanded: boolean = true;
  sidenavExpandChange: Subject<boolean> = new Subject<boolean>();
  sidenavWidth!: number;
  sidenavWidthChange: Subject<number> = new Subject<number>();

  constructor() {
    this.sidenavExpandChange.subscribe((value) => {
      this.isSidenavExpanded = value;
      this.sidenavWidthChange.next(this.sidenavWidth = this.isSidenavExpanded ? 248 : 72);
    });

    // this.sidenavWidthChange.subscribe((value) => {
    //   this.sidenavWidth = value;
    // });
  }

  toggleSidebarExpand() {
    this.sidenavExpandChange.next(!this.isSidenavExpanded);
    // this.sidenavWidthChange.next(this.sidenavWidth = this.isSidenavExpanded ? 248 : 72);
  }
}
