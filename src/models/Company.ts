import { Project } from "./Project";
import { Teams } from "./Teams";
import { User } from "./User";

export interface Company {
  id: number;
  isValid: boolean;
  name: string;
  users: Array<User>;
  teams: Array<Teams>;
  projects: Array<Project>;
}
