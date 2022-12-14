import {Ticket} from "../../../../models/Ticket";

export class Column {
  public name: string;
  public tickets: Ticket[]

  constructor(name: string, tickets: Ticket[]) {
    this.name = name;
    this.tickets = tickets;
  }
}
