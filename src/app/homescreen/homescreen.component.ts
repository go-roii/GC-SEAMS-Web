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
  fullName!: string;
  email!: string;

	// currentPage: string = this.router.url;
	currentPage: string = 'events';

	constructor(private router : Router, private userService: UserService, private sidedenavExpandService: SidenavExpandService) {
    this.sidedenavExpandService.sidenavExpandChange.subscribe((value) => {
      this.isSidenavExpanded = value;
    });
  }

	ngOnInit(): void {
    const firstName: string = this.userService.ActiveUser.first_name;
    const lastName: string = this.userService.ActiveUser.last_name;
    this.fullName=firstName+" "+lastName;
    this.email=this.userService.ActiveUser.email_address;
		// this.router.navigate(['homescreen/events/ongoing'])
		// this.router.events.subscribe(event => {
		// 	if (event instanceof NavigationStart) {
		// 		this.routerChangeMethod(event.url);
		// 	}
		// })
    console.log("refresh token: "+this.userService.RefreshToken.refresh_token);
    console.log("access token: "+this.userService.AuthHeader)
    console.log(this.userService.getLoginState());
    console.log(this.userService.ActiveUser)
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
