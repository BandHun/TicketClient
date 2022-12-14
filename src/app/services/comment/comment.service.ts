import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Comment} from "../../../models/Comment";


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  public addComment(ticketId: number, comment: Comment) {
    return this.http.post<any>(environment.apiBaseUrl + "/comment/add/" + ticketId, comment);
  }

  public updateComment(comment: Comment) {
    return this.http.put<any>(environment.apiBaseUrl + "/comment/update", comment);
  }

  public deleteComment(commentId: number) {
    return this.http.delete<any>(environment.apiBaseUrl + "/comment/delete/" + commentId);
  }
}
