import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewEventsService {

  newEventsCount: number = 0;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      // if (val instanceof NavigationStart) {
      //   this.newEvents = 0;
      // }

      if (val instanceof NavigationEnd) {
        this.newEventsCount = 0;
      }
    });
  }
}
