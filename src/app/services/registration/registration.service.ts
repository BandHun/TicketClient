import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { User } from "../../../models/User";

@Injectable({
  providedIn : 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {
  }

  public registration(name: string, emailaddress: string, password: any) {
    return this.http.post<User>(environment.apiBaseUrl + "/public/userregistration", {
      name : name,
      emailaddress : emailaddress,
      password : password
    });
  }
}
