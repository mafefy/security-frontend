import { Request } from 'src/app/common/models/request';
import { AuthenticatedRequest } from 'src/app/common/models/authenticated-request';

export class SwitchApp extends AuthenticatedRequest{
	public appCode: string;
	public secLevel: string;
	public departmentId: string;
	public contactId: string;
}