import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss']
})

export class HomescreenComponent implements OnInit {

  currentPage: string = this.router.url;

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event =>{
      if (event instanceof NavigationStart){
         this.routerChangeMethod(event.url);
      }
   })
  }

  routerChangeMethod(url: string){
    this.currentPage = url;
  }

}
