import {Company} from "./Company";
import {Teams} from "./Teams";

export enum UserLevel {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  CUSTOMER = 'CUSTOMER',
  UNKNOWN = 'UNKNOWN',
}

export interface User {
  id: number;
  name: string;
  emailaddress: string;
  password: string;
  company: Company;
  teams: Teams;
  userlevel: UserLevel;
}
