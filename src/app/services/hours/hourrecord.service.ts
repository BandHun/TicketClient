import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { HourRecords } from "../../../models/HourRecords";

@Injectable({
  providedIn : 'root'
})
export class HourrecordService {

  constructor(private http: HttpClient) {
  }

  public getRecordsForTicket(ticketId: number) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.get<Array<HourRecords>>(environment.apiBaseUrl + "/hours/getforticket/" + ticketId, {
      headers
    });
  }

  public getRecordsForUser(userId: number) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.get<number>(environment.apiBaseUrl + "/hours/getforuser/" + userId, {
      headers
    });
  }

  public createHourRecord(ticketId: number, toDate: Date, hours: number) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.post<HourRecords>(environment.apiBaseUrl + "/hours/loghour", {
      ticketId : ticketId,
      toDate : toDate,
      hours : hours
    }, {
      headers
    });
  }
}
