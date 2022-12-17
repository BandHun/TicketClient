import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user/user.service';
import {User} from "../../../../models/User";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile', templateUrl: './profile.component.html', styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id === undefined) {
      this.user = JSON.parse(localStorage.getItem('currentuser'))
      this.userService.getTeam(this.user.id).subscribe(team => {
        this.user.teams = team;
      });
    } else {
      this.userService.getById(id).subscribe(async user => {
        this.user = user;
        await this.userService.getTeam(this.user.id).subscribe(team => {
          this.user.teams = team;
        });
      });
    }
  }

  toEdit() {
    this.router.navigate(['/useredit/' + this.user.id]);
  }

}
