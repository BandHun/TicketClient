import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Company} from "../../../models/Company";
import {JoinCompanyRequest} from "../../../models/JoinCompanyRequest";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {
  }

  public joinCompany(companyId: number) {
    return this.http.post(environment.apiBaseUrl + "/join/" + companyId, {});
  }

  public getAllCompany() {
    return this.http.get<Array<Company>>(environment.apiBaseUrl + "/company/all");
  }

  public createCompany(name: string) {
    return this.http.post<Company>(environment.apiBaseUrl + "/company/add", name);
  }

  public sendJoinRequest(id: number) {
    return this.http.post<JoinCompanyRequest>(environment.apiBaseUrl + "/company/joinrequest/create", id);
  }
}
