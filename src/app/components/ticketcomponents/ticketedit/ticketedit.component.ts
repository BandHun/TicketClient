import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TeamsService} from "../../../services/teams/teams.service";
import {Ticket, TicketStatus} from "../../../../models/Ticket";
import {TicketService} from 'src/app/services/ticket/ticket.service';
import {User} from "../../../../models/User";
import {UserService} from "../../../services/user/user.service";
import {Project} from "../../../../models/Project";
import {ProjectsService} from "../../../services/projects/projects.service";
// @ts-ignore
import equals from 'fast-deep-equal';
import {NotificationsComponent} from "../../commoncomponents/notifications/notifications.component";
import {Teams} from "../../../../models/Teams";
import {Sprint} from "../../../../models/Sprint";
import {DocumentService} from "../../../services/document/document.service";

@Component({
  selector: 'app-ticketedit', templateUrl: './ticketedit.component.html', styleUrls: ['./ticketedit.component.css']
})
export class TicketeditComponent implements OnInit {

  projects = Array<Project>();
  ticket: Ticket;
  users = Array<User>();
  statuses = Array<string>();
  assignee: User;

  team: Teams;
  teams = Array<Teams>();
  sprint: Sprint;
  sprints = Array<Sprint>();
  project: Project;
  teamnotnull = false;
  file: any;
  selectedFiles: FileList;


  constructor(private projectsService: ProjectsService, private documentService: DocumentService,
              private teamService: TeamsService, private route: ActivatedRoute, private ticketService: TicketService,
              private teamsService: TeamsService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => this.ticketService.getTicketsById(Number(params['ticketId'])).subscribe(ticket => {
        this.ticket = ticket;
        this.userService.getByCompany(this.ticket.author.company.id).subscribe(users => {
          users.forEach(user => this.users.push(user));
        });
        this.projectsService.getAllProjects().subscribe(allproject => {
          allproject.forEach(proj => this.projects.push(proj));
        });

      }));
    for (var status in TicketStatus) {
      this.statuses.push(status);
    }
    this.teamService.getTeamsByCompany().subscribe(teams => this.teams = teams);
  }

  save2() {
    this.documentService.uploadDocumentToTicket(this.ticket.id, this.selectedFiles[0]).subscribe(
      () => NotificationsComponent.notification("JO"))
  }

  save(): void {
    this.ticketService.save(this.ticket).subscribe(ticket => {
      this.ticket = ticket;
      this.documentService.uploadDocumentToTicket(this.ticket.id, this.selectedFiles[0])
      this.router.navigate(['tickets']);
      NotificationsComponent.notification("Ticket updated");
    }, (err) => {
      console.log(err);
      NotificationsComponent.notification(err);
    });
  }

  myequal(o1: any, o2: any) {
    return equals(o1, o2);
  }

  teamchanged(team: Teams): void {
    this.ticket.sprint = null;
    console.log(this.team);
    this.teamService.getsprints(22).subscribe(sprints => {
      this.sprints = sprints;

    }, (err) => {
      this.sprints = null
    })
    this.ticket.assignee = null;
    this.teamnotnull = true;
    this.teamService.getUsers(22).subscribe(users => {
      this.users = users
    })

  }

  selectFile(event: any) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      var size = event.target.files[0].size;
      if (size > 1000000) {
        alert("size must not exceeds 1 MB");
      } else {
        this.selectedFiles = event.target.files;
      }
    } else {
      alert('invalid format!');
    }

  }
}
