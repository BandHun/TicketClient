import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from "../../../../models/User";

@Component({
  selector : 'app-profile',
  templateUrl : './profile.component.html',
  styleUrls : ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getById(Number(localStorage.getItem('userId'))).subscribe(user => this.user = user);
  }

}
