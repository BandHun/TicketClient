import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Teams} from "../../../../models/Teams";
import {TeamsService} from "../../../services/teams/teams.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SprintService} from "../../../services/sprint/sprint.service";
import {Sprint} from "../../../../models/Sprint";

@Component({
  selector: 'app-sprints', templateUrl: './sprints.component.html', styleUrls: ['./sprints.component.css']
})
export class SprintsComponent implements OnInit {

  createsprintform: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Teams>();
  sprint: Sprint

  constructor(private teamsService: TeamsService, private formBuilder: FormBuilder,
              private sprintService: SprintService, private router: Router, private route: ActivatedRoute) {
    this.sprint = new Sprint();
  }

  ngOnInit(): void {
    this.createsprintform = this.formBuilder.group({
      startdate: [null], enddate: [null]
    })
    this.teamsService.getTeamsByCompany().subscribe(teams => {
      teams.forEach(teams => this.dataSource.data.push(teams));
      this.dataSource._updateChangeSubscription();
    });
  }

  onSubmit() {
    this.sprintService.createSprint(this.sprint).subscribe(user => {
      this.router.navigate(['/home']);
    });
  }

}
