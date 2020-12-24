import { AuthenticatedRequest } from "src/app/common/models/authenticated-request";

export class AddUserRequest extends AuthenticatedRequest {
  public credentials: Credential;
}
