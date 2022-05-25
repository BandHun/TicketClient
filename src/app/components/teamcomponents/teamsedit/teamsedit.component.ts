import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Teams } from "../../../../models/Teams";
import { MatTableDataSource } from "@angular/material/table";
import { User } from "../../../../models/User";
import { UserService } from "../../../services/user/user.service";
import { TeamsService } from 'src/app/services/teams/teams.service';

@Component({
  selector : 'app-teamsedit',
  templateUrl : './teamsedit.component.html',
  styleUrls : ['./teamsedit.component.css']
})
export class TeamseditComponent implements OnInit {
  // @ts-ignore
  team: Teams;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(private route: ActivatedRoute, private userService: UserService, private teamsService: TeamsService, private router: Router) {
    this.route.params.subscribe(params => this.team = JSON.parse(params['team']));
  }

  ngOnInit(): void {
    this.userService.getByTeam(this.team.id).subscribe(users => {
      users.forEach(user => this.dataSource.data.push(user));
      this.dataSource._updateChangeSubscription();
    });
  }

  changename(name: string): void {
    this.team.name = name;
    this.teamsService.updateTeam(this.team).subscribe(() => this.router.navigate(['teamsregistration']));
  }

  kickFromTeam(user: User): void {
    this.userService.kickFromTeam(user.id).subscribe(userdel => {
      this.dataSource.data = this.dataSource.data.filter((data) => data.id !== userdel.id);
      this.dataSource._updateChangeSubscription();
    });
  }
}
