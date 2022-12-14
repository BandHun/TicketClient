import {User} from './User';

export class Comment {
  id: number;
  isValid: boolean;
  commentMessage: string;
  creator: User;
  createDateTime: Date;
  updateDateTime: Date;

  constructor() {
  }
}
