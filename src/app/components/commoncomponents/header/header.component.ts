import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/User";
import {GlobalVariablesAndFunctions} from "../../../GlobalVariablesAndFunctions";
import {menuList2} from "./menu-list";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-header', templateUrl: './header.component.html', styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  routeList = menuList2;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      GlobalVariablesAndFunctions.currentUser = user;
    })
  }

}
