import {Component, OnInit} from '@angular/core';
import {Ticket} from "../../../../models/Ticket";
import {Comment} from "../../../../models/Comment";
import {ActivatedRoute, Router} from "@angular/router";
import {TicketService} from "../../../services/ticket/ticket.service";
import {TeamsService} from "../../../services/teams/teams.service";
import {UserService} from "../../../services/user/user.service";
import {HourRecords} from "../../../../models/HourRecords";
import {HourrecordService} from "../../../services/hours/hourrecord.service";
import {MatTableDataSource} from "@angular/material/table";
import {Document} from "../../../../models/Document";

@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.component.html',
  styleUrls: ['./ticketdetails.component.css']
})
export class TicketdetailsComponent implements OnInit {

  // @ts-ignore
  ticket: Ticket;
  addcommentvisible: boolean = false;
  addhourvisible: boolean = false;
  displayedCommentColumns: string[] = ['creator', 'createDateTime', 'commentMessage', 'actions'];
  commentem: Comment;
  commentmessage: string;
  editcommentvisible = false;
  comments = new MatTableDataSource<Comment>();
  documents = new MatTableDataSource<Document>();
  displayedDocumentColumns: string[] = ['name', 'actions'];
  displayedHoursColumns: string[] = ['user', 'toDate', 'recordedhours'];
  loggedhours = new MatTableDataSource<HourRecords>();

  logDate: Date;
  loghours: number;

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private teamsService: TeamsService,
              private hourrecordService: HourrecordService, private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.ticketService.getTicketsById(this.route.snapshot.params['id']).subscribe(ticket => {
      this.ticket = ticket
      // @ts-ignore
      this.ticket.comments.forEach(comment => this.comments.data.push(comment));
      this.hourrecordService.getRecordsForTicket(this.ticket.id).subscribe(hours => {
        hours.forEach(loggedhour => this.loggedhours.data.push(loggedhour));
        this.loggedhours._updateChangeSubscription();
      })
      this.comments._updateChangeSubscription();
    });
  }

  downloadDocument(docid: Number) {
  }

  addcomment(comment: string): void {
    this.ticketService.addComment(this.ticket.id, comment).subscribe(comment => {
      this.comments.data.push(comment);
      this.comments._updateChangeSubscription();
      this.addcommentvisible = !this.addcommentvisible;
    });
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
    });
  }

  edit(): void {
    this.router.navigate(['ticketedit/' + this.ticket.id, {ticketId: this.ticket.id}]);
  }

  deleteComment(comment: Comment) {
    this.ticketService.deleteComment(comment.id).subscribe()
  }

  editComment(comment: Comment) {
    this.commentem = comment;
    this.editcommentvisible = true;
    this.commentmessage = comment.commentMessage;
  }

  updateComment() {
    this.editcommentvisible = false;
    // @ts-ignore
    this.ticketService.updateComment(comment).subscribe()
  }

}
