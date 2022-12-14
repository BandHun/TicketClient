import {User} from "../models/User";
import {UserService} from "./services/user/user.service";

export class GlobalVariablesAndFunctions {
  public static currentUser: User = null;


  public static removeItemFromArray(array: Array<any>, element: any): Array<any> {
    array.forEach((value, index) => {
      if (value == element) array.splice(index, 1);
    });
    return array;
  }

  public static async refreshCurrentUser(userService: UserService) {
    userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }
}
