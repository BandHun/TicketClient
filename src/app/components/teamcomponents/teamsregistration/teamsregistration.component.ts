import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Teams} from "../../../../models/Teams";
import {TeamsService} from 'src/app/services/teams/teams.service';
import {Router} from "@angular/router";
import {TeamstableService} from "../../../services/teamtable/teamstable.service";

@Component({
  selector: 'app-teamsregistration',
  templateUrl: './teamsregistration.component.html',
  styleUrls: ['./teamsregistration.component.css']
})
export class TeamsregistrationComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<Teams>();
  registration = false;

  constructor(private teamsService: TeamsService, private tableService: TeamstableService, private router: Router) {
  }

  setvisibleaddteam() {
    this.registration = !this.registration;
  }

  ngOnInit(): void {
    this.teamsService.getTeamsByCompany().subscribe(teams => {
      teams.forEach(teams => this.dataSource.data.push(teams));
      this.dataSource._updateChangeSubscription();
    });
  }

  registerTeam(name: string): void {
    this.teamsService.createTeam(name).subscribe(team => {
      this.dataSource.data.push(team);
      this.dataSource._updateChangeSubscription();
    });
  }

  createTable(teamId: number) {
    this.tableService.createTable(teamId);
  }

  joinTema(teamId: number) {
    this.teamsService.joinTeam(teamId).subscribe();
  }

  hasNotTable(team: Teams) {
    console.log(team.teamsTable)
  }
}

