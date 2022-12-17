import {User} from "./User";
import {Sprint} from "./Sprint";
import {Project} from "./Project";
import {Company} from "./Company";
import {Teams} from "./Teams";

export enum TicketStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  IN_TEST = 'IN_TEST',
  DEMO = 'DEMO',
  DONE = 'DONE',
}


export class Ticket {
  id: number;
  isValid: boolean;
  title: string;
  author: User;
  assignee: User;
  createdAt: Date;
  storyPoints: number;
  usedStroyPoints: number;
  project: Project;
  description: string;
  company: Company;
  status: TicketStatus;
  documents: Array<Document>;
  comments: Array<Comment>;
  sprint: Sprint;
  teams: Teams;

  constructor(title: string, author: User, assignee: User, project: Project, description: string, storyPoints: number,
              status: TicketStatus, sprint: Sprint) {
  }
}
