import { AuthenticatedRequest } from './authenticated-request';
import { Request } from './request';

export class AuthenticatedUserRequest extends AuthenticatedRequest {
  public appCode: string;
  public departmentId: string;
  public contactId: string;
  public userId: number;
}
