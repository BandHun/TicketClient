import {Ticket, TicketStatus} from "../../../../models/Ticket";

export class Column {
  public name: string;
  public status: TicketStatus;
  public tickets: Ticket[]

  constructor(name: string, status: TicketStatus, tickets: Ticket[]) {
    this.name = name;
    this.status = status;
    this.tickets = tickets;
  }
}
