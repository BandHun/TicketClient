import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector : 'app-notifications',
  templateUrl : './notifications.component.html',
  styleUrls : ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  public static notification(message: string) {
    Swal.fire(message);
  }
}
