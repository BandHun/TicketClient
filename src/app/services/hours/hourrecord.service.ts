import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {HourRecords} from "../../../models/HourRecords";

@Injectable({
  providedIn: 'root'
})
export class HourrecordService {

  constructor(private http: HttpClient) {
  }

  public getRecordsForTicket(ticketId: number) {
    return this.http.get<Array<HourRecords>>(environment.apiBaseUrl + "/hours/getforticket/" + ticketId
    );
  }

  public getRecordsForUser(userId: number) {
    return this.http.get<number>(environment.apiBaseUrl + "/hours/getforuser/" + userId
    );
  }

  public createHourRecord(ticketId: number, toDate: Date, hours: number) {
    return this.http.post<HourRecords>(environment.apiBaseUrl + "/hours/loghour", {
        ticketId: ticketId,
        toDate: toDate,
        hours: hours
      }
    );
  }
}
