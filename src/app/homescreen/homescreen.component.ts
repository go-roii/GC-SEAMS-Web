import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SidenavExpandService } from '../services/sidenav-expand.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss']
})

export class HomescreenComponent implements OnInit {

	isSidenavExpanded: boolean = this.sidedenavExpandService.isSidenavExpanded;

	// currentPage: string = this.router.url;
	currentPage: string = 'events';

	constructor(private router : Router, private userService: UserService, private sidedenavExpandService: SidenavExpandService) {
    this.sidedenavExpandService.sidenavExpandChange.subscribe((value) => {
      this.isSidenavExpanded = value;
    });
  }

	ngOnInit(): void {
		// this.router.navigate(['homescreen/events/ongoing'])
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
    console.log(this.isSidenavExpanded);

    this.sidedenavExpandService.toggleSidebarExpand()
	}

  logout(){
    this.userService.logOut();
    console.log(this.userService.getLoginState());
  }

}
