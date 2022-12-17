import {Component, OnInit} from '@angular/core';
import {User, UserLevel} from "../../../../models/User";
import {UserService} from "../../../services/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Teams} from "../../../../models/Teams";
// @ts-ignore
import equals from "fast-deep-equal";
import {TeamsService} from "../../../services/teams/teams.service";
import {NotificationsComponent} from "../../commoncomponents/notifications/notifications.component";
import {GlobalVariablesAndFunctions} from "../../../GlobalVariablesAndFunctions";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-useredit', templateUrl: './useredit.component.html', styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

  editForm: FormGroup;
  currentUser: User;
  user: User;
  teams = Array<Teams>();
  userlevels = new Array<string>()

  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute,
              private teamService: TeamsService, private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.teamService.getTeamsByCompany().subscribe(teams => this.teams = teams);
    this.currentUser = GlobalVariablesAndFunctions.currentUser;
    this.userService.getById(id).subscribe(user => {
      this.user = user;
      this.editForm = this.formBuilder.group({
        name: [this.user.name, Validators.required],
        emailaddress: [this.user.emailaddress, Validators.required],
        company: [this.user.company, Validators.required],
        teams: [this.user.teams, Validators.required],
        userlevel: [this.user.userLevel, Validators.required],
      });
    });

    for (var lvl in UserLevel) {
      this.userlevels.push(lvl);
    }
  }

  leaveCompany() {
    this.userService.leaveCompany(this.user.id).subscribe(() => {
      NotificationsComponent.notification("You have to choose a new company")
      this.router.navigate(['/companyregistration']);
    })
  }

  iscurrentUser() {
    return this.currentUser.id == this.user.id;
  }

  retTrue() {
    return true;
  }

  save() {
    this.userService.updateUser(this.editForm.value, this.user.id).subscribe(user => {
      if (this.currentUser.id == this.user.id) {
        NotificationsComponent.notification("To finish updates, we have to log out you!")
        this.router.navigate(['/logout']);
      } else {
        this.user = user;
        NotificationsComponent.notification("Update finished")
      }
    })/**/
  }
}
