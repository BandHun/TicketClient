import {Injectable} from '@angular/core';
import {TeamsTable} from "../../../models/TeamsTable";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Ticket} from "../../../models/Ticket";

@Injectable({
  providedIn: 'root'
})
export class TeamstableService {

  constructor(private http: HttpClient) {
  }

  getTicketsBySprintId(id: number) {
    return this.http.get<Array<Ticket>>(environment.apiBaseUrl + "/sprint/tickets/" + id);
  }

  public getTeamTables() {
    return this.http.get<Array<TeamsTable>>(environment.apiBaseUrl + "/tables/allbycompany");
  }

  public getTeamTableById(teamId: number) {
    return this.http.get<TeamsTable>(environment.apiBaseUrl + "/tables/" + teamId);
  }

  public getTeamTableByTeamId(teamId: number) {
    return this.http.get<TeamsTable>(environment.apiBaseUrl + "/tables/byteamid/" + teamId);
  }

  public createTable(teamId: number) {
    return this.http.post<TeamsTable>(environment.apiBaseUrl + "/tables/createtoteam", teamId);
  }
}
