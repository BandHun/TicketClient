import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from "./Board";
import {TeamsTable} from "../../../../models/TeamsTable";
import {Sprint} from "../../../../models/Sprint";
import {User} from "../../../../models/User";
import {TeamstableService} from "../../../services/teamtable/teamstable.service";
import {TeamsService} from "../../../services/teams/teams.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Ticket, TicketStatus} from "../../../../models/Ticket";
import {Column} from "./Column";
// @ts-ignore
import equals from "fast-deep-equal";

@Component({
  selector: 'app-ticketboard', templateUrl: './ticketboard.component.html', styleUrls: ['./ticketboard.component.scss']
})
export class TicketboardComponent implements OnInit {
  teamtable: TeamsTable
  sprint: Sprint;
  sprints = new Array<Sprint>();
  users = new Array<User>();
  board: Board;
  teamtableid: number;

  constructor(private tableService: TeamstableService, private teamservice: TeamsService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.teamtableid = this.route.snapshot.params['id'];
    this.teamservice.getUsersByTableId(this.teamtableid).subscribe(users => this.users = users)
    this.tableService.getTeamTableByTeamId(this.teamtableid).subscribe(table => {
      this.teamtable = table;
      table.sprints.forEach(sprint => {
        this.sprints.push(sprint);
      });
    });
  }


  drop(event: CdkDragDrop<Ticket[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  myequal(o1: any, o2: any) {
    return equals(o1, o2);
  }

  sprintchange(selected: Sprint) {
    this.board = this.ticketsToColumns(selected.tickets);
  }

  ticketsToColumns(tickets: Array<Ticket>) {
    let TODO = new Column("TODO", []);
    let STARTED_PROGRESS = new Column("STARTED_PROGRESS", []);
    let WAITING_FOR_REVIEW = new Column("WAITING_FOR_REVIEW", []);
    let WAITING_FOR_TEST = new Column("WAITING_FOR_TEST", []);
    let DEMO = new Column("DEMO", []);
    let DONE = new Column("DONE", []);
    let board = new Board();

    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].status === TicketStatus.TODO) {
        TODO.tickets.push(tickets[i]);
      }
      if (tickets[i].status === TicketStatus.STARTED_PROGRESS) {
        STARTED_PROGRESS.tickets.push(tickets[i]);
      }
      if (tickets[i].status === TicketStatus.WAITING_FOR_REVIEW) {
        WAITING_FOR_REVIEW.tickets.push(tickets[i]);
      }
      if (tickets[i].status === TicketStatus.WAITING_FOR_TEST) {
        WAITING_FOR_TEST.tickets.push(tickets[i]);
      }
      if (tickets[i].status === TicketStatus.DEMO) {
        DEMO.tickets.push(tickets[i]);
      }
      if (tickets[i].status === TicketStatus.DONE) {
        DONE.tickets.push(tickets[i]);
      }
    }
    board.name = "TESZT";
    board.columns = [TODO, STARTED_PROGRESS, WAITING_FOR_REVIEW, WAITING_FOR_TEST, DEMO, DONE]
    return board;

  }

  /*sprintchange(selected: Sprint) {
    this.dataSource = new MatTableDataSource<Ticket>();
    this.tableService.getTicketsBySprintId(selected.id).subscribe(tickets => {
      tickets.forEach(ticket => {
        this.dataTostore.data.push(ticket)
        this.dataSource.data.push(ticket);
        this.dataSource._updateChangeSubscription();
      })
    });
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
  }/**/
}
