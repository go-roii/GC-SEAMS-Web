import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UpdatedEventService {

  updatedEventUUID!: string;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      // if (val instanceof NavigationStart) {
      //   this.updatedEventUUID = '';
      // }

      if (val instanceof NavigationEnd) {
        this.updatedEventUUID = '';
      }
    });
  }
}
