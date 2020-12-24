import { Credentials } from './credentials';
import { Response } from 'src/app/common/models/response';
import { UserData } from './user.data';
import { DashBoardResponse } from 'src/app/home/service/models/dashboard.response';

export class LoginResponse extends DashBoardResponse {
  public token: string;

  // to be removed
  //to be removed
  public FirstName: string;
  public LastName: string;
  // public credentials: Credentials;
  public Token: string;


  // public user: UserData ;
  public inboxesRefreshRate;
}
