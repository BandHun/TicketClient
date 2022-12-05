import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Ticket} from "../../../../models/Ticket";
import {TicketService} from "../../../services/ticket/ticket.service";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {JoinCompanyRequest} from "../../../../models/JoinCompanyRequest";

@Component({
  selector: 'app-joinrequest',
  templateUrl: './joinrequest.component.html',
  styleUrls: ['./joinrequest.component.css']
})
export class JoinrequestComponent implements OnInit {

  displayedColumns: string[] = ['title', 'project', 'author', 'assignee', 'creation', 'status', 'actions'];
  dataSource = new MatTableDataSource<JoinCompanyRequest>();

  constructor(private ticketsService: TicketService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  editTicket(ticket: Ticket): void {
    this.router.navigate(['ticketdetails/' + ticket.id, {ticket: JSON.stringify(ticket)}]);
  }

  deleteTicket(ticketId: number): void {
    this.ticketsService.deleteTicket(ticketId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((data) => data.id !== ticketId);
      this.dataSource._updateChangeSubscription();
    });
  }

}
