import {Ticket} from "./Ticket";

export class Sprint {
  id: number;
  isValid: boolean;
  startDate: Date;
  endDate: Date;
  tickets: Array<Ticket>;

  constructor() {
  }
}
