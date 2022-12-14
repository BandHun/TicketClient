import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {ProjectsService} from "../../../services/projects/projects.service";
import {Project} from "../../../../models/Project";

@Component({
  selector: 'app-projects', templateUrl: './projects.component.html', styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<Project>();

  constructor(private projectsService: ProjectsService, private router: Router) {
  }

  ngOnInit(): void {
    this.projectsService.getAllProjects().subscribe(projects => {
      projects.forEach(project => this.dataSource.data.push(project));
      this.dataSource._updateChangeSubscription();
    });
  }

  registerProject(name: string): void {
    this.projectsService.createProject(name).subscribe(project => {
      this.dataSource.data.push(project);
      this.dataSource._updateChangeSubscription();
    })
  }

  details(project: Project): void {
    this.router.navigate(["/projectdetails", {project: JSON.stringify(project)}]);
  }

  delete(project: Project): void {
    this.projectsService.deleteProject(project.id).subscribe(resp => {
      this.dataSource.data = this.dataSource.data.filter((data) => data.id !== project.id);
      this.dataSource._updateChangeSubscription();
    });
  }

}
