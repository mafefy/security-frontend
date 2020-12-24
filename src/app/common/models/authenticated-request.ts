import { Request } from './request';

export class AuthenticatedRequest extends Request {
    public token: string;
}
