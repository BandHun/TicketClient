import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../../services/login/login.service";
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector : 'app-login',
  templateUrl : './login.component.html',
  styleUrls : ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  message: any;
  error: string = "";
  closeSub: Subscription;

  constructor(private service: LoginService, private router: Router) {
    this.username = "";
    this.password = "";
  }

  ngOnInit(): void {
  }

  doLogin() {
    this.service.login(this.username, this.password).subscribe(user => {
        if (user != null) {
          localStorage.setItem('username', this.username);
          localStorage.setItem('password', this.password);
          localStorage.setItem('userId', JSON.parse(user + "").id);
          if (JSON.parse(user + "").company == null) {
            this.router.navigate(['/companyregistration']);
            NotificationsComponent.notification("You are new! Please register or select a company!");
          }
          if (JSON.parse(user + "").teams == null) {
            this.router.navigate(['/teamsregistration']);
            NotificationsComponent.notification("You are new! Please register or select a team!");
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.router.navigate(['/login/unsuccessfulLogin']);
        }
      }, (errorMessage) => {
        if (errorMessage.status == 401) {
          this.error = "Invalid email or password.";
        } else {
          this.error = "Unknown error";
        }
      }
    )
  }
}
