import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavExpandService {

  isSidenavExpanded: boolean = true;
  sidenavExpandChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.sidenavExpandChange.subscribe((value) => {
      this.isSidenavExpanded = value;
    });
  }

  toggleSidebarExpand() {
    this.sidenavExpandChange.next(!this.isSidenavExpanded);
  }
}
