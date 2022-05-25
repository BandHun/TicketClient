import { User } from "./User";
import { Sprint } from "./Sprint";
import { Project } from "./Project";
import { Company } from "./Company";

export enum TicketStatus {
  TODO = 'TODO',
  STARTED_PROGRESS = 'STARTED_PROGRESS',
  WAITING_FOR_REVIEW = 'WAITING_FOR_REVIEW',
  WAITING_FOR_TEST = 'WAITING_FOR_TEST',
  DEMO = 'DEMO',
  DONE = 'DONE',
}


export interface Ticket {
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
}
