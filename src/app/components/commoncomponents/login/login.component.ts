import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../services/login/login.service";
import {Router} from '@angular/router';
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  message: any;
  error: string = "";
  closeSub: Subscription;

  constructor(private loginService: LoginService, userService: UserService, private router: Router) {
    this.username = "";
    this.password = "";
  }

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  doLogin() {
    localStorage.removeItem('token');
    this.loginService.loginJWT(this.username, this.password).subscribe(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('expiresAt', String(res.expiresAtMillies));
      this.router.navigate(['/home']);
    }, (errorMessage) => {
      if (errorMessage.status == 401) {
        this.error = "Invalid email or password.";
      } else {
        this.error = "Unknown error";
      }
    })
  }

  toForgetPassword() {
    this.router.navigate(['/forgetpassword']);
  }

  toRegistration() {
    this.router.navigate(['/registration']);
  }
}
