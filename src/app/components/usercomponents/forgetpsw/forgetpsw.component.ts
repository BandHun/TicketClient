import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {Router} from "@angular/router";
import {NotificationsComponent} from "../../commoncomponents/notifications/notifications.component";

@Component({
  selector: 'app-forgetpsw', templateUrl: './forgetpsw.component.html', styleUrls: ['./forgetpsw.component.css']
})
export class ForgetpswComponent implements OnInit {

  email: string;

  constructor(private userService: UserService, private router: Router) {
    this.email = "";
  }

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  sendForgetPswd(email: string) {
    this.userService.sendForgetPassword(email).subscribe(
      () => NotificationsComponent.notification("If you ve an account, then we sent you a new password in email!"))
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

}
