import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Project} from "../../../models/Project";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) {
  }

  public createProject(name: string) {
    return this.http.post<Project>(environment.apiBaseUrl + "/project/add", name);
  }

  public getAllProjects() {
    return this.http.get<Array<Project>>(environment.apiBaseUrl + "/project/all");
  }

  public deleteProject(projectId: number) {
    return this.http.delete<Array<Project>>(environment.apiBaseUrl + "/project/delete/" + projectId);
  }
}
