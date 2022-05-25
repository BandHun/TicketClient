import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user/user.service';
import { TicketService } from "../../../services/ticket/ticket.service";
import { User } from "../../../../models/User";
import { Project } from "../../../../models/Project";
import { ProjectsService } from "../../../services/projects/projects.service";
import { NotificationsComponent } from "../../commoncomponents/notifications/notifications.component";

@Component({
  selector : 'app-ticketregistration',
  templateUrl : './ticketregistration.component.html',
  styleUrls : ['./ticketregistration.component.css']
})
export class TicketregistrationComponent implements OnInit {
  users = Array<User>();
  assignee: User;
  ticketForm: FormGroup;
  project: Project;
  projects = Array<Project>();

  constructor(private projectsService: ProjectsService, private router: Router, private formBuilder: FormBuilder, private ticketService: TicketService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getById(Number(localStorage.getItem('userId'))).subscribe(user => {
      this.userService.getByCompany(user.company.id).subscribe(users => {
        users.forEach(userek => this.users.push(userek));
      })
    });
    this.projectsService.getAllProjects().subscribe(allprojects => {
      allprojects.forEach(project => this.projects.push(project));
    });
    this.ticketForm = this.formBuilder.group({
      title : [null, [Validators.required]],
      assignee : [null],
      storypoint : [null],
      description : [null]
    })
  }

  onSubmit(title: string, storypoint: string, description: string) {
    this.ticketService.createTicket(title, storypoint, description).subscribe(ticket => {
      if (this.assignee != null) {
        this.ticketService.assigneto(this.assignee.id, ticket.id).subscribe();
        this.ticketService.addToProject(this.project.id, ticket.id).subscribe();
      }
      this.router.navigate(['tickets']);
      NotificationsComponent.notification("Ticket created");
    });
  }
}
