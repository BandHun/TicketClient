import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
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
import {CommentService} from "../../../services/comment/comment.service";
import {GlobalVariablesAndFunctions} from "../../../GlobalVariablesAndFunctions";
import {NotificationsComponent} from "../../commoncomponents/notifications/notifications.component";
import {ProjectsService} from "../../../services/projects/projects.service";
import {DocumentService} from "../../../services/document/document.service";

@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.component.html',
  styleUrls: ['./ticketdetails.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketdetailsComponent implements OnInit {

  ticket: Ticket = null;
  addcommentvisible: boolean = false;
  addhourvisible: boolean = false;
  commentem: Comment;
  commentmessage: string;
  editcommentvisible = false;
  comments = new Array<Comment>();
  documents = new Array<Document>();
  displayedHoursColumns: string[] = ['user', 'toDate', 'recordedhours'];
  loggedhours = new MatTableDataSource<HourRecords>();

  logDate: Date;
  loghours: number;

  constructor(private documentService: DocumentService, private projectsService: ProjectsService,
              private route: ActivatedRoute, private ticketService: TicketService, private teamsService: TeamsService,
              private hourrecordService: HourrecordService, private userService: UserService, private router: Router,
              private commentService: CommentService) {

  }

  ngOnInit(): void {

    if (GlobalVariablesAndFunctions.currentUser == null) {
      this.userService.getCurrentUser().subscribe(user => {
        GlobalVariablesAndFunctions.currentUser = user;
      });
    }
    this.documentService.getDocumentToTicket(this.route.snapshot.params['id']).subscribe(documents => {
      this.documents = documents;
    })
    this.ticketService.getTicketsById(this.route.snapshot.params['id']).subscribe(ticket => {
      this.ticket = ticket
      this.ticketService.getTicketsSprint(this.ticket.id).subscribe(sprint => this.ticket.sprint = sprint);
      this.ticketService.getTicketsTeams(this.ticket.id).subscribe(teams => this.ticket.teams = teams);
      this.ticket.comments.forEach(comment => {
        // @ts-ignore
        this.comments.push(comment);
      });
      this.hourrecordService.getRecordsForTicket(this.ticket.id).subscribe(hours => {
        hours.forEach(loggedhour => this.loggedhours.data.push(loggedhour));
        this.loggedhours._updateChangeSubscription();
      })
      this.hourrecordService.getSummRecordsForTicket(this.ticket.id).subscribe(
        summ => this.ticket.usedStroyPoints = summ)
    });
  }

  downloadDocument(docid: Number) {
  }

  addcomment(commentmesage: string): void {
    let createComment = new Comment();
    createComment.commentMessage = commentmesage;
    this.commentService.addComment(this.ticket.id, createComment).subscribe(comment => {
      this.comments.push(comment);
      this.addcommentvisible = !this.addcommentvisible;
      NotificationsComponent.notification("Comment created successfully")
      window.location.reload();
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
      NotificationsComponent.notification("Hours logged successfully")
      window.location.reload();
    });
  }

  edit(): void {
    this.projectsService.getAllProjects().subscribe(allproject => {
      this.teamsService.getTeamsByCompany().subscribe(teams => {
        this.router.navigate(
          ['ticketedit/' + this.ticket.id, {projects: JSON.stringify(allproject), teams: JSON.stringify(teams)}]);
      })

    });

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

  deleteComment(comment: Comment) {
    this.commentService.deleteComment(comment.id).subscribe(() => {
      this.comments = GlobalVariablesAndFunctions.removeItemFromArray(this.comments, comment);
      window.location.reload();
    });
  }

  deleteDocument(docId: number) {
    this.documentService.deleteDocument(docId).subscribe(() => {
      window.location.reload();
    });
  }

  download(doc: Document) {
    this.documentService.downloadFile(doc.id).subscribe(resp => {
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(resp)
      a.href = objectUrl
      a.download = doc.documentName;
      a.click();
      URL.revokeObjectURL(objectUrl);
    })
  }

  public trackItem(index: number, item: Comment) {
    return item.id;
  }

  sprintToString() {
    if (this.ticket != null) {
      return this.ticket.sprint.startDate + "-" + this.ticket.sprint.endDate;
    } else {
      return ""
    }
  }

}
