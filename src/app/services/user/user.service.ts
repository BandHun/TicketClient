import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { User } from "../../../models/User";

@Injectable({
  providedIn : 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  chooseCompany(companyId: number) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.put<User>(environment.apiBaseUrl + "/user/addcompany", companyId, { headers });
  }

  getById(userId: number) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.get<User>(environment.apiBaseUrl + "/user/" + userId, { headers });
  }

  getByTeam(teamId: number) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.get<Array<User>>(environment.apiBaseUrl + "/user/getbyteam/" + teamId, { headers });
  }

  getByCompany(companyId: number) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.get<Array<User>>(environment.apiBaseUrl + "/user/allbycompany/" + companyId, { headers });
  }

  getAtMyCompany() {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.get<Array<User>>(environment.apiBaseUrl + "/user/allatmycompany", { headers });
  }

  kickFromTeam(userId: number) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.put<User>(environment.apiBaseUrl + "/user/kickfromteam", userId, { headers });
  }
}
