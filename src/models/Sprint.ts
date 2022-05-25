import { Ticket } from "./Ticket";

export interface Sprint {
  id: number;
  isValid: boolean;
  startDate: Date;
  endDate: Date;
  tickets: Array<Ticket>;
}
