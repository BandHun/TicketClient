import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { User } from "../../../models/User";

@Injectable({
  providedIn : 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  public login(username: string, password: string) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(username + ":" + password) });
    return this.http.get<User>(environment.apiBaseUrl + "/login", { headers, responseType : 'text' as 'json' });
  }
}
