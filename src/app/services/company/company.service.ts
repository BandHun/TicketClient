import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Company } from "../../../models/Company";

@Injectable({
  providedIn : 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {
  }

  public getAllCompany() {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.get<Array<Company>>(environment.apiBaseUrl + "/company/all", { headers });
  }

  public createCompany(name: string) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.post<Company>(environment.apiBaseUrl + "/company/add", name, { headers });
  }


}
