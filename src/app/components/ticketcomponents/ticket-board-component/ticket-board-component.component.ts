import {Component, Input, OnInit} from '@angular/core';
import {Ticket} from "../../../../models/Ticket";

@Component({
  selector: 'app-ticket-board-component',
  templateUrl: './ticket-board-component.component.html',
  styleUrls: ['./ticket-board-component.component.css']
})
export class TicketBoardComponentComponent implements OnInit {
  @Input() ticket: Ticket;

  constructor() {
  }

  ngOnInit(): void {
  }


}
