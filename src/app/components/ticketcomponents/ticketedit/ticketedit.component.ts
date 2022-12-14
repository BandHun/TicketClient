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
  selectedProject: Project = null;

  ticket: Ticket;
  ticketToStor: Ticket
  users = Array<User>();
  statuses = Array<string>();
  assignee: User;

  team: Teams;
  teams = Array<Teams>();
  sprint: Sprint;
  sprints = Array<Sprint>();
  teamnotnull = false;
  file: any;
  selectedFiles: FileList;


  constructor(private projectsService: ProjectsService, private documentService: DocumentService,
              private teamService: TeamsService, private route: ActivatedRoute, private ticketService: TicketService,
              private teamsService: TeamsService, private userService: UserService, private router: Router) {
    this.projects = JSON.parse(this.route.snapshot.params['projects']);
  }

  async ngOnInit() {
    /*this.projectsService.getAllProjects().subscribe(allproject => {
      allproject.forEach(proj => this.projects.push(proj));
      this.isTicketReady()
    });*/
    this.teamService.getTeamsByCompany().subscribe(teams => this.teams = teams);
    this.teamService.getsprints(Number(this.route.snapshot.params['id'])).subscribe(sprints => {
      this.sprints = sprints;
      this.isTicketReady()
    }, (err) => {
      this.sprints = null
    })
    this.userService.getAtMyCompany().subscribe(users => {
      users.forEach(user => {
        this.users.push(user);
      });
      this.isTicketReady()
    });
    this.route.params.subscribe(
      params => this.ticketService.getTicketsById(Number(this.route.snapshot.params['id'])).subscribe(ticket => {
        this.ticketToStor = ticket;
        this.isTicketReady()
      }));
    for (var status in TicketStatus) {
      this.statuses.push(status);
    }
  }

  isTicketReady() {
    if (this.ticketToStor != null) {
      if (this.users != null && this.users.length != 0) {
        if (this.projects != null && this.projects.length != 0) {
          if (this.sprints != null && this.sprints.length != 0) {
            this.ticket = this.ticketToStor
            this.selectedProject = this.ticket.project;
            console.log(this.selectedProject)
          }
        }
      }
    }
  }

  save2() {
    this.documentService.uploadDocumentToTicket(this.ticket.id, this.selectedFiles[0]).subscribe(
      () => NotificationsComponent.notification("JO"))
  }

  save(): void {
    this.ticketService.save(this.ticket).subscribe(ticket => {
      this.ticket = ticket;
      this.documentService.uploadDocumentToTicket(this.ticket.id, this.selectedFiles[0]).subscribe(
        () => NotificationsComponent.notification("Documentum uploaded succesfully"))

      this.router.navigate(['tickets']);
      NotificationsComponent.notification("Ticket updated");
    }, (err) => {
      console.log(err);
      NotificationsComponent.notification(err);
    });
  }

  teamchanged(): void {
    this.ticket.assignee = null;
    this.teamnotnull = true;
    this.projects = [...this.projects]
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
