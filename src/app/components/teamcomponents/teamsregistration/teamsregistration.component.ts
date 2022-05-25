import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Teams } from "../../../../models/Teams";
import { TeamsService } from 'src/app/services/teams/teams.service';
import { Router } from "@angular/router";

@Component({
  selector : 'app-teamsregistration',
  templateUrl : './teamsregistration.component.html',
  styleUrls : ['./teamsregistration.component.css']
})
export class TeamsregistrationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Teams>();

  constructor(private teamsService: TeamsService, private router: Router) {
  }

  ngOnInit(): void {
    this.teamsService.getTeamsByCompany().subscribe(teams => {
      teams.forEach(teams => this.dataSource.data.push(teams));
      this.dataSource._updateChangeSubscription();
    });
  }

  registerTeam(name: string): void {
    this.teamsService.createTeam(name).subscribe(user => this.router.navigate(['home']));
  }

  editTeam(team: Teams): void {
    this.router.navigate(['teamsedit/' + team.id, { team : JSON.stringify(team) }]);
  }

  joinTema(id: number): void {
    this.teamsService.joinTeam(id).subscribe(user => {
      localStorage.setItem('userId', user.id + "");
      this.router.navigate(['home']);
    });
  }
}

