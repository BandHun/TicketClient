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
import {TicketService} from "../../../services/ticket/ticket.service";
import {NotificationsComponent} from "../../commoncomponents/notifications/notifications.component";

@Component({
  selector: 'app-ticketboard', templateUrl: './ticketboard.component.html', styleUrls: ['./ticketboard.component.scss']
})
export class TicketboardComponent implements OnInit {
  teamtable: TeamsTable
  sprint: Sprint;
  sprints = new Array<Sprint>();
  users = new Array<User>();
  filterUser: User;
  board: Board;
  teamtableid: number;

  constructor(private tableService: TeamstableService, private teamservice: TeamsService, private router: Router,
              private route: ActivatedRoute, private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.teamtableid = this.route.snapshot.params['id'];
    this.teamservice.getUsersByTableId(this.teamtableid).subscribe(users => {
      this.users = users;
    })
    this.tableService.getTeamTableByTeamId(this.teamtableid).subscribe(table => {
      this.teamtable = table;
      table.sprints.forEach(sprint => {
        this.sprints.push(sprint);
      });
    });
  }


  drop(event: CdkDragDrop<Ticket[]>, column: Column) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.ticketService.changeStatus(event.previousContainer.data[event.previousIndex], column.status).subscribe(
        () => {
          transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex,
            event.currentIndex);
          NotificationsComponent.notification("Status changed successfully")
        }, (err) => {
          NotificationsComponent.notification(err)
        })
    }
  }

  myequal(o1: any, o2: any) {
    return equals(o1, o2);
  }

  sprintchange(selected: Sprint) {
    this.filterUser = null;
    this.board = this.ticketsToColumns(selected.tickets);
  }

  ticketsToColumns(tickets: Array<Ticket>) {
    let TODO = new Column("TODO", TicketStatus.TODO, []);
    let IN_PROGRESS = new Column("IN_PROGRESS", TicketStatus.IN_PROGRESS, []);
    let IN_REVIEW = new Column("IN_REVIEW", TicketStatus.IN_REVIEW, []);
    let IN_TEST = new Column("IN_TEST", TicketStatus.IN_TEST, []);
    let DEMO = new Column("DEMO", TicketStatus.DEMO, []);
    let DONE = new Column("DONE", TicketStatus.DONE, []);
    let board = new Board();

    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].status === TicketStatus.TODO) {
        TODO.tickets.push(tickets[i]);
      }
      if (tickets[i].status === TicketStatus.IN_PROGRESS) {
        IN_PROGRESS.tickets.push(tickets[i]);
      }
      if (tickets[i].status === TicketStatus.IN_REVIEW) {
        IN_REVIEW.tickets.push(tickets[i]);
      }
      if (tickets[i].status === TicketStatus.IN_TEST) {
        IN_TEST.tickets.push(tickets[i]);
      }
      if (tickets[i].status === TicketStatus.DEMO) {
        DEMO.tickets.push(tickets[i]);
      }
      if (tickets[i].status === TicketStatus.DONE) {
        DONE.tickets.push(tickets[i]);
      }
    }
    board.name = "TESZT";
    board.columns = [TODO, IN_PROGRESS, IN_REVIEW, IN_TEST, DEMO, DONE]
    return board;

  }

  filterTickets(user: User) {
    let filtered = new Array<Ticket>()
    this.sprint.tickets.forEach(ticket => {
      let assignee = ticket.assignee
      if (assignee != null && assignee.id === user.id) {
        filtered.push(ticket)
      }
    })
    this.board = this.ticketsToColumns(filtered);
  }
}
