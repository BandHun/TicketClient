import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Ticket} from "../../../models/Ticket";
import {Sprint} from 'src/models/Sprint';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {
  }

  public createTicket(ticket: Ticket) {
    return this.http.post<Ticket>(environment.apiBaseUrl + "/ticket/add", ticket);
  }

  public save(ticket: Ticket) {
    console.log(ticket);
    return this.http.put<Ticket>(environment.apiBaseUrl + "/ticket/update", ticket);
  }

  public addToSprint(ticketId: number, sprint: Sprint) {
    return this.http.post<Ticket>(environment.apiBaseUrl + "/ticket/tosprint/" + ticketId, sprint);
  }


  public assigneto(assignee: number, ticketid: number) {
    return this.http.put<Ticket>(environment.apiBaseUrl + "/ticket/assigneto/" + ticketid, assignee);
  }

  public addToProject(projectId: number, ticketid: number) {
    return this.http.put<Ticket>(environment.apiBaseUrl + "/ticket/addtoproject/" + ticketid, projectId);
  }

  public getTicketsById(Id: number) {
    return this.http.get<Ticket>(environment.apiBaseUrl + "/ticket/" + Id);
  }

  public getTicketsByCompany() {
    return this.http.get<Array<Ticket>>(environment.apiBaseUrl + "/ticket/allbycompany");
  }


  public deleteTicket(ticketId: number) {
    return this.http.delete<any>(environment.apiBaseUrl + "/ticket/delete/" + ticketId);
  }

  public addComment(ticketId: number, message: string) {
    return this.http.post<any>(environment.apiBaseUrl + "/comment/add/" + ticketId, message);
  }

  public updateComment(comment: Comment) {
    return this.http.post<any>(environment.apiBaseUrl + "/comment/update", comment);
  }

  public deleteComment(commentId: number) {
    return this.http.delete<any>(environment.apiBaseUrl + "/comment/add/" + commentId);
  }
}
