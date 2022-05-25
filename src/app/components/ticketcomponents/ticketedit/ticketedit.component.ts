import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TeamsService } from "../../../services/teams/teams.service";
import { Ticket, TicketStatus } from "../../../../models/Ticket";
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { User } from "../../../../models/User";
import { UserService } from "../../../services/user/user.service";
import { Project } from "../../../../models/Project";
import { ProjectsService } from "../../../services/projects/projects.service";
// @ts-ignore
import equals from 'fast-deep-equal';
import { NotificationsComponent } from "../../commoncomponents/notifications/notifications.component";

@Component({
  selector : 'app-ticketedit',
  templateUrl : './ticketedit.component.html',
  styleUrls : ['./ticketedit.component.css']
})
export class TicketeditComponent implements OnInit {

  projects = Array<Project>();
  ticket: Ticket;
  users = Array<User>();
  statuses = Array<string>();
  assignee: User;


  constructor(private projectsService: ProjectsService, private route: ActivatedRoute, private ticketService: TicketService, private teamsService: TeamsService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.ticketService.getTicketsById(Number(params['ticketId'])).subscribe(ticket => {
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


  }

  save(): void {
    this.ticketService.save(this.ticket).subscribe(ticket => {
      this.ticket = ticket;
      this.router.navigate(['tickets']);
      NotificationsComponent.notification("Ticket updated");
    });
  }

  myequal(o1: any, o2: any) {
    return equals(o1, o2);
  }
}
