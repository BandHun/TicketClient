import { Company } from "./Company";
import { Teams } from "./Teams";

export interface User {
  id: number;
  name: string;
  emailaddress: string;
  password: string;
  company: Company;
  teams: Teams;
}
