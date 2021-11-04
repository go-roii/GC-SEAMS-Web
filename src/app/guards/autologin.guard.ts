import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AutologinGuard implements CanLoad {

  constructor(private router: Router, private user: UserService){}

  canLoad() {
    if(this.user.getLoginState() === 'true'){
      this.router.navigateByUrl('\homescreen')
    }
    return true
  }
}
