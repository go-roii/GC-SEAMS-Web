import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss']
})

export class HomescreenComponent implements OnInit {

	isExpanded: boolean = true;

	// currentPage: string = this.router.url;
	currentPage: string = 'events';

	constructor(private router : Router, private userService: UserService) { }

	ngOnInit(): void {
		this.router.navigate(['homescreen/events/ongoing'])
		// this.router.events.subscribe(event => {
		// 	if (event instanceof NavigationStart) {
		// 		this.routerChangeMethod(event.url);
		// 	}
		// })
    console.log(this.userService.getLoginState());
	}

	// routerChangeMethod(url: string) {
	// 	this.currentPage = url;
	// }

	activePage(page: string) {
		console.log(page);
		this.currentPage = page;
	}

	sidenav_status() {
		if(this.isExpanded)
            this.isExpanded = false;
        else
            this.isExpanded = true;
	}

  logout(){
    this.userService.logOut();
    console.log(this.userService.getLoginState());
  }

}
