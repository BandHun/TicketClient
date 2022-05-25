import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector : 'app-navbar',
  templateUrl : './navbar.component.html',
  styleUrls : ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  doLogout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
