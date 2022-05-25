import { User } from "./User";
import { Company } from "./Company";
import { TeamsTable } from "./TeamsTable";

export interface Teams {
  id: number;
  isValid: boolean;
  name: string;
  users: Array<User>;
  company: Company;
  teamsTable: TeamsTable;
}
