import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../../models/User";

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

  updateUser(user: User) {
    return this.http.put<User>(environment.apiBaseUrl + "/user/update", user);
  }
}
