import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../../models/User";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'team', 'actions'];
  dataSource = new MatTableDataSource<User>();
  user: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentuser'))
  }

  ngOnInit(): void {
    this.userService.getAtMyCompany().subscribe(users => {
      users.forEach(user => this.dataSource.data.push(user));
      this.dataSource._updateChangeSubscription();
    });
  }
}
