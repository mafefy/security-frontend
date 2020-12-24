import { AuthenticatedRequest } from "src/app/common/models/authenticated-request";

export class UsersListRequest extends AuthenticatedRequest {
  public name: string;
  constructor(
    public pageIndex: number,
    public pageSize: number) {
    super();
  }
}
