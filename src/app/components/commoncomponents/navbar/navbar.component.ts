import {Component, OnInit} from '@angular/core';
import {menuList} from './menu-list';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {User, UserLevel} from "../../../../models/User";

@Component({
  selector: 'app-navbar', templateUrl: './navbar.component.html', styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  routeList = menuList;
  collapse = false;
  showHeader = false;
  user: User;

  constructor(private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(event => this.modifyHeader(event));
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentuser'))
  }

  hideSidebar() {
    this.collapse = !this.collapse;
  }

  modifyHeader(location: any) {
    if (location.url === '/login' || location.url === '/registration' || location.url === '/forgetpassword' || location.url === "/logout") {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
  }

  foradmin(b: boolean) {
    if (b) {
      if (this.user.userLevel === UserLevel.ADMIN) {
        return true
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

}
