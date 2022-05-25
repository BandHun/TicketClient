import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Project } from "../../../models/Project";

@Injectable({
  providedIn : 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) {
  }

  public createProject(name: string) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.post<Project>(environment.apiBaseUrl + "/project/add", name, { headers });
  }

  public getAllProjects() {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.get<Array<Project>>(environment.apiBaseUrl + "/project/all", { headers });
  }

  public deleteProject(projectId: number) {
    const headers = new HttpHeaders({ Authorization : 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')) });
    return this.http.delete<Array<Project>>(environment.apiBaseUrl + "/project/delete/" + projectId, { headers });
  }
}
