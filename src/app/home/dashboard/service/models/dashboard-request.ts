import { AuthenticatedRequest } from 'src/app/common/models/authenticated-request';
import { AuthenticatedUserRequest } from 'src/app/common/models/authenticated-user-request';

export class DashboardRequest extends AuthenticatedUserRequest {

  public graphId?: string;
  public interval?: string;

  constructor(public zooming: boolean) {
    super();
  }

}
