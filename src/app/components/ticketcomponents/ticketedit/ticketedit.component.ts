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
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-ticketedit', templateUrl: './ticketedit.component.html', styleUrls: ['./ticketedit.component.css']
})
export class TicketeditComponent implements OnInit {

  projects = Array<Project>();
  selectedProject: Project = null;

  editform: FormGroup;

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

  Ttitle: String = ""
  Tproject: Project = null;


  constructor(private formBuilder: FormBuilder, private projectsService: ProjectsService,
              private documentService: DocumentService, private teamService: TeamsService,
              private route: ActivatedRoute, private ticketService: TicketService, private teamsService: TeamsService,
              private userService: UserService, private router: Router) {
    this.projects = JSON.parse(this.route.snapshot.params['projects']);
    this.teams = JSON.parse(this.route.snapshot.params['teams']);
  }

  ngOnInit() {
    this.userService.getAtMyCompany().subscribe(users => {
      users.forEach(user => {
        this.users.push(user);
      });
      this.isTicketReady()
    });
    this.route.params.subscribe(
      params => this.ticketService.getTicketsById(Number(this.route.snapshot.params['id'])).subscribe(ticket => {
        this.ticketToStor = ticket;
        console.log(ticket)
        this.isTicketReady();
        if (ticket.teams != null) {
          this.teamService.getsprints(ticket.teams.id).subscribe(sprints => {
            this.sprints = sprints;
            this.isTicketReady()
          }, (err) => {
            this.sprints = null
          })
        }
      }));
    for (var status in TicketStatus) {
      this.statuses.push(status);
    }
  }

  isTicketReady() {
    if (this.ticketToStor != null) {
      if (this.users != null && this.users.length != 0) {
        if (this.projects != null && this.projects.length != 0) {
          this.ticket = this.ticketToStor
          this.Ttitle = this.ticket.title
          this.Tproject = this.ticket.project
          this.selectedProject = this.ticket.project;
          this.editform = this.formBuilder.group({
            title: [this.ticket.title, Validators.required],
            storyPoints: [this.ticket.storyPoints, Validators.required],
            description: [this.ticket.description, Validators.required],
            project: [this.ticket.project, Validators.required], //team: [this.ticket.team, Validators.required],
            sprint: [this.ticket.sprint, Validators.required],
            assignee: [this.ticket.assignee, Validators.required],
            status: [this.ticket.status, Validators.required],
          });
        }
      }
    }
  }

  onSubmit() {
    this.ticketService.save(this.ticket.id, this.ticket).subscribe(ticket => {
      if (this.ticket.teams != null) {
        this.ticketService.addToTeam(this.ticket.id, this.ticket.teams).subscribe(ticket => {
          console.log("team added")
        })
      }
      if (this.ticket.sprint != null) {
        this.ticketService.addToSprint(this.ticket.id, this.ticket.sprint).subscribe(ticket => {
          console.log("sprint added")
        })
      }
      if (this.ticket.project != null) {
        this.ticketService.addToProject(this.ticket.project.id, this.ticket.id).subscribe(() => {
          console.log("project added")
        })
      }
      if (this.ticket.assignee != null) {
        this.ticketService.assigneto(this.ticket.assignee.id, this.ticket.id).subscribe(() => {
          console.log("assignee added")
        })
      }
      if (this.selectedFiles != undefined) {
        this.documentService.uploadDocumentToTicket(this.ticket.id, this.selectedFiles[0]).subscribe(() => {
        })
      }
      this.ticket = ticket;
      this.router.navigate(['tickets']);
      NotificationsComponent.notification("Ticket updated");
    }, (err) => {
      NotificationsComponent.notification(err);
    });/**/
  }

  save2() {
    this.documentService.uploadDocumentToTicket(this.ticket.id, this.selectedFiles[0]).subscribe(() => {
    })
  }

  /*save(): void {
    this.ticketService.save(this.ticket).subscribe(ticket => {
      this.ticket = ticket;
      this.documentService.uploadDocumentToTicket(this.ticket.id, this.selectedFiles[0]).subscribe(
        () => NotificationsComponent.notification("Documentum uploaded succesfully"))

      this.router.navigate(['tickets']);
      NotificationsComponent.notification("Ticket updated");
    }, (err) => {
      NotificationsComponent.notification(err);
    });
  }*/

  teamchanged(event: any): void {
    this.teamnotnull = true;

    this.teamService.getUsers(event.id).subscribe(users => {
      this.users = users
    })
    this.teamService.getsprints(event.id).subscribe(sprints => {
      this.sprints = sprints;
    });/**/
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
