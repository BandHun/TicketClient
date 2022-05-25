import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Ticket } from "../../../models/Ticket";

@Injectable({
  providedIn : 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {
  }

  public createTicket(title: string, storypoint: string, description: string) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });

    return this.http.post<Ticket>(environment.apiBaseUrl + "/ticket/add", {
      title : title,
      storypoint : storypoint,
      description : description
    }, {
      headers
    });
  }

  public save(ticket: Ticket) {
    console.log(ticket);
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.put<Ticket>(environment.apiBaseUrl + "/ticket/update", ticket, {
      headers
    });
  }


  public assigneto(assignee: number, ticketid: number) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.put<Ticket>(environment.apiBaseUrl + "/ticket/assigneto/" + ticketid, assignee, {
      headers
    });
  }

  public addToProject(projectId: number, ticketid: number) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.put<Ticket>(environment.apiBaseUrl + "/ticket/addtoproject/" + ticketid, projectId, {
      headers
    });
  }

  public getTicketsById(Id: number) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.get<Ticket>(environment.apiBaseUrl + "/ticket/" + Id, {
      headers
    });
  }

  public getTicketsByCompany() {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.get<Array<Ticket>>(environment.apiBaseUrl + "/ticket/allbycompany", {
      headers
    });
  }


  public deleteTicket(ticketId: number) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.delete<any>(environment.apiBaseUrl + "/ticket/delete/" + ticketId, {
      headers
    });
  }

  public addComment(ticketId: number, message: string) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.post<any>(environment.apiBaseUrl + "/comment/add/" + ticketId, message, {
      headers
    });
  }
}
