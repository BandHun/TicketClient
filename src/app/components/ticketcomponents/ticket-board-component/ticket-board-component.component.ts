import {Component, Input, OnInit} from '@angular/core';
import {Ticket} from "../../../../models/Ticket";
import {Router} from "@angular/router";
import {HourrecordService} from "../../../services/hours/hourrecord.service";

@Component({
  selector: 'app-ticket-board-component',
  templateUrl: './ticket-board-component.component.html',
  styleUrls: ['./ticket-board-component.component.css']
})
export class TicketBoardComponentComponent implements OnInit {
  @Input() ticket: Ticket;

  constructor(private router: Router, private hourService: HourrecordService) {
  }

  ngOnInit(): void {
    this.hourService.getSummRecordsForTicket(this.ticket.id).subscribe(summ => this.ticket.usedStroyPoints = summ);
  }

  toTicketDetails() {
    this.router.navigate(['ticketdetails/' + this.ticket.id]);
  }
}
