import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {User, UserLevel} from "../../../../models/User";
import {UserService} from "../../../services/user/user.service";
import {GlobalVariablesAndFunctions} from "../../../GlobalVariablesAndFunctions";
import {NotificationsComponent} from "../../commoncomponents/notifications/notifications.component";

@Component({
  selector: 'app-users', templateUrl: './users.component.html', styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'team', 'actions'];
  dataSource = new MatTableDataSource<User>();
  user: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = GlobalVariablesAndFunctions.currentUser;
  }

  async ngOnInit() {
    await this.userService.getAtMyCompany().subscribe(users => {
      users.forEach(user => this.dataSource.data.push(user));
      this.dataSource._updateChangeSubscription();
    });
  }

  isAdmin(): boolean {
    if (this.user == null) {
      return false;
    }
    return this.user.userLevel == UserLevel.ADMIN;
  }

  toProfile(user: User) {
    this.router.navigate(['/profile/' + user.id]);
  }

  setAdmin(user: User) {
    this.userService.setAdmin(user).subscribe(user => NotificationsComponent.notification("Set Admin successfully"))
  }
}
