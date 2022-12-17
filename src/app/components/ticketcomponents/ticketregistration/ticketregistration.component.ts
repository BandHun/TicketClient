import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from 'src/app/services/user/user.service';
import {TicketService} from "../../../services/ticket/ticket.service";
import {User} from "../../../../models/User";
import {Project} from "../../../../models/Project";
import {ProjectsService} from "../../../services/projects/projects.service";
import {NotificationsComponent} from "../../commoncomponents/notifications/notifications.component";
import {Teams} from "../../../../models/Teams";
import {TeamsService} from "../../../services/teams/teams.service";
import {Sprint} from "../../../../models/Sprint";
import {DocumentService} from "../../../services/document/document.service";
import {Ticket} from "../../../../models/Ticket";

@Component({
  selector: 'app-ticketregistration',
  templateUrl: './ticketregistration.component.html',
  styleUrls: ['./ticketregistration.component.css']
})
export class TicketregistrationComponent implements OnInit {
  users = Array<User>();
  assignee: User;
  ticketForm: FormGroup;
  team: Teams;
  teams = Array<Teams>();
  sprint: Sprint;
  sprints = Array<Sprint>();
  project: Project;
  projects = Array<Project>();
  teamnotnull = false;
  file: any;
  ticket: Ticket;
  selectedFiles: FileList;


  constructor(private documentService: DocumentService, private projectsService: ProjectsService,
              private teamservice: TeamsService, private router: Router, private formBuilder: FormBuilder,
              private ticketService: TicketService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.ticket = new Ticket(null, null, null, null, null, null, null, null);
    this.teamservice.getTeamsByCompany().subscribe(teams => this.teams = teams);
    this.projectsService.getAllProjects().subscribe(allprojects => {
      allprojects.forEach(project => this.projects.push(project));
    });
    this.ticketForm = this.formBuilder.group({
      title: [null, [Validators.required]], assignee: [null], storypoint: [null], description: [null]
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

  onSubmit() {
    this.ticketService.createTicket(this.ticket).subscribe(ticket => {
      if (this.file != null) {
        this.documentService.uploadDocumentToTicket(ticket.id, this.file).subscribe();
      }
      this.ticketService.addToSprint(ticket.id, this.ticket.sprint).subscribe(() => {
        this.router.navigate(['tickets']);
        NotificationsComponent.notification("Ticket created");
      });
    });
  }

  teamchanged() {
    this.ticket.sprint = null;
    if (this.ticket.teams.teamsTable != null) {
      this.sprints = this.ticket.teams.teamsTable.sprints;
    } else {
      this.sprints = null;
    }
    this.ticket.assignee = null;

    this.teamnotnull = true;
    this.teamservice.getUsers(this.ticket.teams.id).subscribe(users => {
      this.users = users
    })
  }
}
