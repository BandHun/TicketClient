import {Teams} from "./Teams";
import {Ticket} from "./Ticket";
import {Sprint} from "./Sprint";

export interface TeamsTable {
  id: number;
  isValid: boolean;
  name: string;
  teams: Teams;
  sprints: Array<Sprint>;
  backlog: Array<Ticket>;
}
