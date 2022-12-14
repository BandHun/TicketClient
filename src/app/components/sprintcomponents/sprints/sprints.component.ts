import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Teams} from "../../../../models/Teams";
import {TeamsService} from "../../../services/teams/teams.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SprintService} from "../../../services/sprint/sprint.service";
import {Sprint} from "../../../../models/Sprint";
import {NotificationsComponent} from "../../commoncomponents/notifications/notifications.component";

@Component({
  selector: 'app-sprints', templateUrl: './sprints.component.html', styleUrls: ['./sprints.component.css']
})
export class SprintsComponent implements OnInit {

  createsprintform: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Teams>();
  sprint: Sprint
  startDate: Date;
  endDate: Date;

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
    let sprint = new Sprint();
    sprint.startDate = this.startDate;
    sprint.endDate = this.endDate;
    this.sprintService.createSprint(sprint, this.route.snapshot.params['id']).subscribe(sprint => {
      NotificationsComponent.notification("Sprint created successfully");

    });
    this.router.navigate(['/teamtable/' + this.route.snapshot.params['id']]).then(r => {
    });
  }

}
