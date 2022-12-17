import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User, UserLevel} from "../../../models/User";
import {Teams} from "../../../models/Teams";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  sendForgetPassword(email: string) {
    return this.http.post<User>(environment.apiBaseUrl + "/public/forgetpassword", email);
  }

  getById(userId: number) {
    return this.http.get<User>(environment.apiBaseUrl + "/user/" + userId);
  }

  getByTeam(teamId: number) {
    return this.http.get<Array<User>>(environment.apiBaseUrl + "/user/getbyteam/" + teamId);
  }

  getByCompany(companyId: number) {
    return this.http.get<Array<User>>(environment.apiBaseUrl + "/user/allbycompany/" + companyId);
  }

  getMyCompanyUsers() {
    return this.http.get<Array<User>>(environment.apiBaseUrl + "/user/allmycompany");
  }

  getAtMyCompany() {
    return this.http.get<Array<User>>(environment.apiBaseUrl + "/user/allatmycompany");
  }

  getCurrentUser() {
    return this.http.get<User>(environment.apiBaseUrl + "/user/currentuser");
  }

  kickFromTeam(userId: number) {
    return this.http.put<User>(environment.apiBaseUrl + "/user/kickfromteam", userId);
  }

  leaveCompany(userId: number) {
    return this.http.post<any>(environment.apiBaseUrl + "/user/leavecompany", userId);
  }

  updateUser(user: User, id: number) {
    let teamId = user.teams
    user.teams = null;
    user.id = id;
    if (teamId != null) {
      this.addToTeam(user, teamId).subscribe(() => {
      });
    }
    if (user.userLevel != null) {
      this.setLevel(user.id, user.userLevel).subscribe(() => {
      })
    }
    return this.http.put<User>(environment.apiBaseUrl + "/user/update", user);
  }

  setLevel(userId: number, level: UserLevel) {
    return this.http.put<User>(environment.apiBaseUrl + "/user/setlevel/" + userId, level);
  }

  addToTeam(user: User, teamId: any) {
    return this.http.put<User>(environment.apiBaseUrl + "/user/addtoteambyid/" + teamId, user);
  }

  setAdmin(user: User) {
    return this.http.put<User>(environment.apiBaseUrl + "/user/setadmin", user.id);
  }

  getTeam(userId: number) {
    return this.http.get<Teams>(environment.apiBaseUrl + "/user/getteamem/" + userId);
  }
}
