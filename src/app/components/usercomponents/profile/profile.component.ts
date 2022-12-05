import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user/user.service';
import {User} from "../../../../models/User";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id === undefined) {
      this.user = JSON.parse(localStorage.getItem('currentuser'))
    } else {
      this.userService.getById(id).subscribe(user => {
        this.user = user;
      });
    }
  }

}
