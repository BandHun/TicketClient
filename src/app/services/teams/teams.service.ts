import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Teams } from "../../../models/Teams";
import { User } from "../../../models/User";

@Injectable({
  providedIn : 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) {
  }

  public getTeamsByCompany() {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.get<Array<Teams>>(environment.apiBaseUrl + "/teams/allbycompany", { headers });
  }

  public createTeam(name: string) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.post<Teams>(environment.apiBaseUrl + "/teams/add", name, { headers });
  }

  public joinTeam(teamId: number) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.put<User>(environment.apiBaseUrl + "/user/jointeam", teamId, { headers });
  }

  public updateTeam(team: Teams) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.put<Teams>(environment.apiBaseUrl + "/teams/update", team, { headers });
  }
}
