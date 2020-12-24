import { AuthenticatedRequest } from "src/app/common/models/authenticated-request";

export class UserIdRequest extends AuthenticatedRequest {
  public id: number;
}
