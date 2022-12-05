import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {TeamstableService} from "../../../services/teamtable/teamstable.service";
import {TeamsTable} from "../../../../models/TeamsTable";

@Component({
  selector: 'app-teamtables',
  templateUrl: './teamtables.component.html',
  styleUrls: ['./teamtables.component.css']
})
export class TeamtablesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<TeamsTable>();

  constructor(private tableService: TeamstableService, private router: Router) {
  }

  ngOnInit(): void {
    this.tableService.getTeamTables().subscribe(tables => {
      tables.forEach(table => {
        if (table != null) {
          this.dataSource.data.push(table);
        }
      });
      this.dataSource._updateChangeSubscription();
    });
  }
}
