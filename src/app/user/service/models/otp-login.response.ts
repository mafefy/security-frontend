import { Credentials } from './credentials';
import { Response } from 'src/app/common/models/response';
import { UserData } from './user.data';
import { DashBoardResponse } from 'src/app/home/service/models/dashboard.response';
import { LoginResponse } from './login.response';

export class OTPLoginResponse extends LoginResponse {
    public smsEnabled: boolean;
    public smsSent: boolean;
    public phoneNumber: string;

}
