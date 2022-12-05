import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {JwtResponse} from "../../../models/responses/JwtResponse";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  public loginJWT(username: string, password: string) {
    return this.http.post<JwtResponse>(environment.apiBaseUrl + '/public/gettoken', {
      username: username,
      password: password
    })
  }

  public logout() {
    localStorage.removeItem('token');
  }
}
