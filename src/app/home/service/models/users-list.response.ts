import { AuthenticatedRequest } from "src/app/common/models/authenticated-request";
import { User } from "./user";

export class UsersListResponse extends Response {
  public users: User[];
  public totalRecords: number;

}
