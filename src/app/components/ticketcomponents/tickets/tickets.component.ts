import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {TicketService} from "../../../services/ticket/ticket.service";
import {Ticket} from "../../../../models/Ticket";
import {UserService} from 'src/app/services/user/user.service';

@Component({
  selector: 'app-tickets', templateUrl: './tickets.component.html', styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'project', 'assignee', 'status', 'actions'];
  dataSource = new MatTableDataSource<Ticket>();

  constructor(private ticketsService: TicketService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.ticketsService.getTicketsByCompany().subscribe(tickets => {
      tickets.forEach(ticket => {
        this.dataSource.data.push(ticket);
      });
      this.dataSource._updateChangeSubscription();
    })
  }

  editTicket(ticket: Ticket): void {
    this.router.navigate(['ticketdetails/' + ticket.id]);
  }

  deleteTicket(ticketId: number): void {
    this.ticketsService.deleteTicket(ticketId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((data) => data.id !== ticketId);
      this.dataSource._updateChangeSubscription();
    });
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
