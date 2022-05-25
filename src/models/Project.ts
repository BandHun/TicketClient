import { Company } from "./Company";
import { Ticket } from "./Ticket";

export interface Project {
  id: number;
  isValid: boolean;
  name: string;
  company: Company;
  tickets: Array<Ticket>;
}
