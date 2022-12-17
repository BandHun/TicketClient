import {Component, OnInit} from '@angular/core';
import {menuList} from './menu-list';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {User, UserLevel} from "../../../../models/User";
import {GlobalVariablesAndFunctions} from 'src/app/GlobalVariablesAndFunctions';
import {UserService} from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar', templateUrl: './navbar.component.html', styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  routeList = menuList;
  collapse = false;
  showHeader = false;
  user: User;

  constructor(private router: Router, private userService: UserService) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(event => this.modifyHeader(event));
  }

  ngOnInit(): void {
    GlobalVariablesAndFunctions.refreshCurrentUser(this.userService).then(
      () => this.user = GlobalVariablesAndFunctions.currentUser);
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
    if (this.user == null) {
      return true;
    }
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
