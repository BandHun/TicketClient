import {User} from "../../../../models/User";


export class UserWithHours {
  user: User;
  hours: Array<number>

  constructor(user: User, hours: Array<number>) {
    this.user = user;
    this.hours = hours;
  }
}
