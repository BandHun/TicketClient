import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Teams} from "../../../models/Teams";
import {User} from "../../../models/User";
import {Sprint} from "../../../models/Sprint";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) {
  }

  public validSprint(s: Sprint) {
    return this.http.post<any>(environment.apiBaseUrl + "/sprint/valid", s);
  }

  public getsprints(teamId: number) {
    return this.http.get<Array<Sprint>>(environment.apiBaseUrl + "/teams/getsprints/" + teamId);
  }

  public getTeamsByCompany() {
    return this.http.get<Array<Teams>>(environment.apiBaseUrl + "/teams/allbycompany");
  }

  public createTeam(name: string) {
    return this.http.post<Teams>(environment.apiBaseUrl + "/teams/add", name);
  }

  public getUsers(id: number) {
    return this.http.get<Array<User>>(environment.apiBaseUrl + "/teams/getusers/" + id);
  }

  public getUsersByTableId(id: number) {
    return this.http.get<Array<User>>(environment.apiBaseUrl + "/teams/userstableid/" + id);
  }

  public joinTeam(teamId: number) {
    return this.http.put<User>(environment.apiBaseUrl + "/user/jointeam", teamId);
  }

  public updateTeam(team: Teams) {
    return this.http.put<Teams>(environment.apiBaseUrl + "/teams/update", team);
  }
}
