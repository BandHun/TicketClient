import { User } from './User';
import { Document } from './Document';

export interface Comment {
  id: number;
  isValid: boolean;
  commentMessage: string;
  creator: User;
  createDateTime: Date;
  updateDateTime: Date;
  documents: Array<Document>;
}
