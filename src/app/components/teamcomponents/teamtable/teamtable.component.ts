import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TeamstableService} from "../../../services/teamtable/teamstable.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Sprint} from "../../../../models/Sprint";
import {Ticket} from "../../../../models/Ticket";
// @ts-ignore
import equals from "fast-deep-equal";
import {TeamsTable} from "../../../../models/TeamsTable";
import {User} from "../../../../models/User";
import {TeamsService} from "../../../services/teams/teams.service";

@Component({
  selector: 'app-teamtable', templateUrl: './teamtable.component.html', styleUrls: ['./teamtable.component.css']
})
export class TeamtableComponent implements OnInit {

  displayedColumns: string[] = ['title', 'assignee', 'status', 'actions'];
  dataSource = new MatTableDataSource<Ticket>();
  dataTostore = new MatTableDataSource<Ticket>();
  teamtableid: number;
  teamtable: TeamsTable
  sprint: Sprint;
  sprints = new Array<Sprint>();
  users = new Array<User>();

  constructor(private tableService: TeamstableService, private teamservice: TeamsService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.teamtableid = this.route.snapshot.params['id'];
    this.teamservice.getUsersByTableId(this.teamtableid).subscribe(users => this.users = users)
    this.tableService.getTeamTableByTeamId(this.teamtableid).subscribe(table => {
      this.teamtable = table;
      table.sprints.forEach(sprint => this.sprints.push(sprint));
    });
  }

  myequal(o1: any, o2: any) {
    return equals(o1, o2);
  }

  sprintchange(selected: Sprint) {
    this.dataSource = new MatTableDataSource<Ticket>();

    selected.tickets.forEach(ticket => {
      this.dataTostore.data.push(ticket)
      this.dataSource.data.push(ticket);
      this.dataSource._updateChangeSubscription();
    })

  }

  filter(user: User) {
    let dataSource = new MatTableDataSource<Ticket>();
    for (let i = 0; i < this.dataTostore.data.length; i++) {
      if (this.dataTostore.data[i].assignee.id === user.id) {
        dataSource.data.push(this.dataTostore.data[i]);
      }
    }
    this.dataSource = dataSource;
    this.dataSource._updateChangeSubscription();
  }

  setvisibleaddteam() {
    this.router.navigate(['/sprintcreate/' + this.teamtableid])
  }

  todetails(id: number) {
    this.router.navigate(['/ticketdetails/' + id])
  }
}
