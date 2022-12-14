import {Company} from "./Company";
import {Teams} from "./Teams";

export enum UserLevel {
  ADMIN = 'ADMIN', DEVELOPER = 'DEVELOPER', CUSTOMER = 'CUSTOMER', UNKNOWN = 'UNKNOWN',
}

export class User {
  constructor(id: number, name: string, emailaddress: string, password: string, company: Company, teams: Teams,
              userLevel: UserLevel) {
    this.id = id;
    this.name = name;
    this.emailaddress = emailaddress;
    this.password = password;
    this.company = company;
    this.teams = teams;
    this.userLevel = userLevel;

  }

  id: number;
  name: string;
  emailaddress: string;
  password: string;
  company: Company;
  teams: Teams;
  userLevel: UserLevel;
}
