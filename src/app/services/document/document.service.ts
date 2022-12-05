import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Document} from "../../../models/Document";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) {
  }

  uploadDocumentToTicket(ticketId: number, file: File) {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    return this.http.post(environment.apiBaseUrl + "/document/toticket/" + ticketId, formdata);
  }

  uploadDocumentToComment(commentId: number, file: any) {
    return this.http.post<Document>(environment.apiBaseUrl + "/document/tocomment/" + commentId, file);
  }

  deleteDocument(documentId: number) {
    return this.http.delete(environment.apiBaseUrl + "/document/delete/" + documentId);
  }

  getDocument(documentId: number) {
    return this.http.delete(environment.apiBaseUrl + "/document/get/" + documentId);
  }
}
