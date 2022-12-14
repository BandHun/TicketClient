import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {Router} from "@angular/router";
import {User} from "../../../../models/User";
import {GlobalVariablesAndFunctions} from "../../../GlobalVariablesAndFunctions";

@Component({
  selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      GlobalVariablesAndFunctions.currentUser = user;
      localStorage.setItem('currentuser', JSON.stringify(user));
      if (this.user.company == null) {
        this.router.navigate(['/companyregistration']);
      }
    }, (error) => {
      localStorage.removeItem('token')
      localStorage.removeItem('currentuser')
      this.router.navigate(['/login']);
    })
  }

}
