import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ticket system';
  showHeader = false;


  constructor(
    private router: Router
  ) {
    this.router.events.pipe(
      filter(e => e instanceof
        NavigationEnd
      )
    ).subscribe(event => this.modifyHeader(event));
  }

  ngOnInit() {
  }

  modifyHeader(location: any) {
    if (location.url === '/login' || location.url === '/registration' || location.url === '/forgetpassword' || location.url === "/logout") {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
  }
}
