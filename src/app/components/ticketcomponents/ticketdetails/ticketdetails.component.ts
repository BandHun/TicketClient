import { Component, OnInit } from '@angular/core';
import { Ticket } from "../../../../models/Ticket";
import { ActivatedRoute, Router } from "@angular/router";
import { TicketService } from "../../../services/ticket/ticket.service";
import { TeamsService } from "../../../services/teams/teams.service";
import { UserService } from "../../../services/user/user.service";
import { HourRecords } from "../../../../models/HourRecords";
import { HourrecordService } from "../../../services/hours/hourrecord.service";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector : 'app-ticketdetails',
  templateUrl : './ticketdetails.component.html',
  styleUrls : ['./ticketdetails.component.css']
})
export class TicketdetailsComponent implements OnInit {

  // @ts-ignore
  ticket: Ticket;
  addcommentvisible: boolean = false;
  addhourvisible: boolean = false;
  displayedCommentColumns: string[] = ['id', 'creator', 'createDateTime', 'commentMessage'];
  comments = new MatTableDataSource<Comment>();
  displayedHoursColumns: string[] = ['user', 'toDate', 'recordedhours'];
  loggedhours = new MatTableDataSource<HourRecords>();

  logDate: Date;
  loghours: number;

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private teamsService: TeamsService, private hourrecordService: HourrecordService, private userService: UserService, private router: Router) {
    this.route.params.subscribe(params => this.ticket = JSON.parse(params['ticket']));
    this.ticket.comments.forEach(comment => this.comments.data.push(comment));
    this.hourrecordService.getRecordsForTicket(this.ticket.id).subscribe(hours => {
      hours.forEach(loggedhour => this.loggedhours.data.push(loggedhour));
      this.loggedhours._updateChangeSubscription();
    })
    this.comments._updateChangeSubscription();
  }

  ngOnInit(): void {
  }

  addcomment(comment: string): void {
    this.ticketService.addComment(this.ticket.id, comment).subscribe(comment => {
        this.comments.data.push(comment);
        this.comments._updateChangeSubscription();
        this.addcommentvisible = !this.addcommentvisible;
      }
    );
  }

  setvisibleaddcomment(): void {
    this.addcommentvisible = !this.addcommentvisible;
  }

  setvisibleaddhour(): void {
    this.addhourvisible = !this.addhourvisible;
  }

  loghurs(): void {
    this.hourrecordService.createHourRecord(this.ticket.id, this.logDate, this.loghours).subscribe(hour => {
        this.loggedhours.data.push(hour);
        this.loggedhours._updateChangeSubscription();
        this.addhourvisible = !this.addhourvisible;
      }
    );
  }

  edit(): void {
    this.router.navigate(['ticketedit/' + this.ticket.id, { ticketId : this.ticket.id }]);
  }


}
