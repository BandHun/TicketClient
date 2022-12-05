import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/User";
import {UserService} from "../../../services/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Teams} from "../../../../models/Teams";
// @ts-ignore
import equals from "fast-deep-equal";
import {TeamsService} from "../../../services/teams/teams.service";
import {NotificationsComponent} from "../../commoncomponents/notifications/notifications.component";

@Component({
  selector: 'app-useredit', templateUrl: './useredit.component.html', styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

  user: User;
  teams = Array<Teams>();

  constructor(private userService: UserService, private route: ActivatedRoute, private teamService: TeamsService,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.teamService.getTeamsByCompany().subscribe(teams => this.teams = teams);

    this.userService.getById(id).subscribe(user => {
      this.user = user;
    });

  }

  leaveCompany() {
    this.userService.leaveCompany(this.user.id).subscribe(() => {
      NotificationsComponent.notification("You have to choose a new company")
      this.router.navigate(['/companyregistration']);
    })
  }

  myequal(o1: any, o2: any) {
    return equals(o1, o2);
  }

  save() {
    this.userService.updateUser(this.user).subscribe(() => {
      NotificationsComponent.notification("Update finished")
    })
  }
}
