import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Ticket, TicketStatus} from "../../../models/Ticket";
import {Sprint} from 'src/models/Sprint';
import {SprintService} from "../sprint/sprint.service";
import {TeamsService} from "../teams/teams.service";
import {UserService} from '../user/user.service';
import {Teams} from "../../../models/Teams";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient, private sprintService: SprintService, private teamService: TeamsService,
              private userService: UserService) {
  }

  public createTicket(ticket: Ticket) {
    return this.http.post<Ticket>(environment.apiBaseUrl + "/ticket/add", ticket);
  }

  public save(ticketId: number, ticket: Ticket) {
    ticket.id = ticketId;
    return this.http.put<Ticket>(environment.apiBaseUrl + "/ticket/update", ticket);
  }

  public addToSprint(ticketId: number, sprint: Sprint) {
    return this.http.post<Ticket>(environment.apiBaseUrl + "/ticket/tosprint/" + ticketId, sprint);
  }

  public changeStatus(ticket: Ticket, status: TicketStatus) {
    return this.http.post(environment.apiBaseUrl + "/ticket/changestatus/" + ticket.id, status);
  }


  public assigneto(assignee: number, ticketid: number) {
    return this.http.put<Ticket>(environment.apiBaseUrl + "/ticket/assigneto/" + ticketid, assignee);
  }

  public addToProject(projectId: number, ticketid: number) {
    return this.http.put<Ticket>(environment.apiBaseUrl + "/ticket/addtoproject/" + ticketid, projectId);
  }

  public addToTeam(ticketid: number, team: Teams) {
    return this.http.put<Ticket>(environment.apiBaseUrl + "/ticket/addtoteam/" + ticketid, team);
  }


  public getTicketsById(Id: number) {
    return this.http.get<Ticket>(environment.apiBaseUrl + "/ticket/" + Id);
  }

  public getTicketsByCompany() {
    return this.http.get<Array<Ticket>>(environment.apiBaseUrl + "/ticket/allbycompany");
  }

  public getTicketsTeams(id: number) {
    return this.http.get<Teams>(environment.apiBaseUrl + "/ticket/getteam/" + id);
  }


  public getTicketsSprint(id: number) {
    return this.http.get<Sprint>(environment.apiBaseUrl + "/ticket/getsprint/" + id);
  }


  public deleteTicket(ticketId: number) {
    return this.http.delete<any>(environment.apiBaseUrl + "/ticket/delete/" + ticketId);
  }

}
