import { AuthenticatedRequest } from "src/app/common/models/authenticated-request";
import { UserIdRequest } from "./user-id-request";

export class SuspendUserRequest extends UserIdRequest {
  public suspend: boolean;
}
