import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Teams} from "../../../../models/Teams";
import {TeamsService} from 'src/app/services/teams/teams.service';
import {Router} from "@angular/router";
import {TeamstableService} from "../../../services/teamtable/teamstable.service";
import {NotificationsComponent} from "../../commoncomponents/notifications/notifications.component";
import {User} from "../../../../models/User";
import {GlobalVariablesAndFunctions} from "../../../GlobalVariablesAndFunctions";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-teamsregistration',
  templateUrl: './teamsregistration.component.html',
  styleUrls: ['./teamsregistration.component.css']
})
export class TeamsregistrationComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<Teams>();
  registration = false;
  user: User;

  constructor(private userService: UserService, private teamsService: TeamsService,
              private tableService: TeamstableService, private router: Router) {
  }

  setvisibleaddteam() {
    this.registration = !this.registration;
  }

  async ngOnInit() {

    await GlobalVariablesAndFunctions.refreshCurrentUser(this.userService);
    this.user = GlobalVariablesAndFunctions.currentUser;

    if (this.user == null) {
      this.userService.getCurrentUser().subscribe(user => {
        this.user = user;
        this.teamsService.getTeamsByCompany().subscribe(teams => {
          teams.forEach(teams => this.dataSource.data.push(teams));
          this.dataSource._updateChangeSubscription();
        });

      });
    } else {
      this.teamsService.getTeamsByCompany().subscribe(teams => {
        teams.forEach(teams => this.dataSource.data.push(teams));
        this.dataSource._updateChangeSubscription();
      });
    }
  }

  registerTeam(name: string): void {
    this.teamsService.createTeam(name).subscribe(team => {
      this.dataSource.data.push(team);
      this.dataSource._updateChangeSubscription();
      NotificationsComponent.notification(
        "Team registered successfully! But you did not join this team automatically! You have to join manually")
    });
  }

  createTable(teamId: number) {
    this.tableService.createTable(teamId).subscribe(table => {
      this.teamsService.getTeamsByCompany().subscribe(teams => {
        this.dataSource = new MatTableDataSource<Teams>();
        teams.forEach(teams => this.dataSource.data.push(teams));
        this.dataSource._updateChangeSubscription();
      });
      NotificationsComponent.notification("Table created successfully")
    });
  }

  joinTema(teamId: number) {
    this.teamsService.joinTeam(teamId).subscribe(() => NotificationsComponent.notification("Joined team successfully"));
  }
}

