import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  currentTab: string = 'ongoing';

  constructor() { }

  ngOnInit(): void {
  }

  activePage(tab: string) {
		this.currentTab = tab;
	}

}
