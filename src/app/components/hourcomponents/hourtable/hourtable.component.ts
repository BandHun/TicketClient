import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TicketService} from "../../../services/ticket/ticket.service";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {HourrecordService} from "../../../services/hours/hourrecord.service";
import {UserWithHours} from "./UserWithHours";

@Component({
  selector: 'app-hourtable', templateUrl: './hourtable.component.html', styleUrls: ['./hourtable.component.css']
})
export class HourtableComponent implements OnInit {
  displayedColumns: string[] = ['users', 'day0', 'day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'sum'];
  dataSource = new MatTableDataSource<UserWithHours>();
  numbers = new Array();
  startDate: Date;
  options = {
    month: "numeric", day: "numeric",
  };


  constructor(private ticketsService: TicketService, private router: Router, private userService: UserService,
              private hourService: HourrecordService) {
  }

  ngOnInit(): void {

    this.numbers = [...Array(7).keys()]
    let defHours = new Array()
    for (let i = 0; i < this.numbers.length; i++) {
      defHours.push(0)
    }
    this.userService.getAtMyCompany().subscribe(users => {
      for (let i = 0; i < users.length; i++) {
        this.dataSource.data.push(new UserWithHours(users[i], defHours));
        this.dataSource._updateChangeSubscription();
      }
    })
  }

  day(plusDays: number): string {
    if (this.startDate == undefined) {
      return "day" + plusDays
    } else {
      var nextDay = new Date(this.startDate)
      nextDay.setDate(nextDay.getDate() + plusDays);
      // @ts-ignore
      return nextDay.toLocaleString("en-US", this.options);
    }
  }

  changeHours() {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      for (let j = 0; j < this.numbers.length; j++) {
        var nextDay = new Date(this.startDate)
        nextDay.setDate(nextDay.getDate() + j);
        let a;
        this.hourService.getRecordsForUserInDay(this.dataSource.data[i].user.id, nextDay).subscribe(data => {
          this.dataSource.data[i].hours[j] = data;
          this.dataSource._updateChangeSubscription();
        })
      }
    }
  }

}
