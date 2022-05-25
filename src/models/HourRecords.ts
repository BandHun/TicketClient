import { Ticket } from "./Ticket";
import { User } from "./User";

export interface HourRecords {
  id: number;
  isValid: number;
  user: User;
  recordedhours: number;
  toDate: Date;
  ticket: Ticket;
}
