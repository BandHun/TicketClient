import {Company} from "./Company";
import {User} from "./User";


export enum RequestStatus {
  ACCAPTED = 'ACCAPTED', DECLINED = 'DECLINED', UNDER_REVIEW = 'UNDER_REVIEW',

}

export interface JoinCompanyRequest {
  id: number;
  user: User;
  requestStatus: RequestStatus;
  company: Company;
}
