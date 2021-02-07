import { AuthenticatedRequest } from "src/app/common/models/authenticated-request";
import { Credentials } from "./credentials";

export class AddAccountRequest extends AuthenticatedRequest {
  public credentials: Credentials;
  public systemId: string;
  public role: string;
}
