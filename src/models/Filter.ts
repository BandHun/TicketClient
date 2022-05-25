import { User } from "./User";

export interface Filter {
  id: number;
  isValid: boolean;
  author: User;
  assignedToUser: User;
}
