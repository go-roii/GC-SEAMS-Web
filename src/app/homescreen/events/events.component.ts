import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  currentPage: string = 'ongoing';

  constructor() { }

  ngOnInit(): void {
  }

  activePage(page: string) {
		console.log(page);
		this.currentPage = page;
	}

}
