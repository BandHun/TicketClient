import { Teams } from "./Teams";
import { Ticket } from "./Ticket";

export interface TeamsTable {
  id: number;
  isValid: boolean;
  name: string;
  teams: Teams;
  tickets: Array<Ticket>;
}
