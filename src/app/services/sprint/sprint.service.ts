import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Teams} from "../../../models/Teams";
import {environment} from "../../../environments/environment";
import {User} from "../../../models/User";
import {Sprint} from "../../../models/Sprint";

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private http: HttpClient) {
  }

  public createSprint(sprint: Sprint, teamId: number) {
    return this.http.post<Teams>(environment.apiBaseUrl + "/sprint/create/" + teamId, sprint);
  }

  public joinTeam(teamId: number) {
    return this.http.put<User>(environment.apiBaseUrl + "/user/jointeam", teamId);
  }

  public updateTeam(team: Teams) {
    return this.http.put<Teams>(environment.apiBaseUrl + "/teams/update", team);
  }
}
