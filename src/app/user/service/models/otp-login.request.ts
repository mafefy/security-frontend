import { Request } from 'src/app/common/models/request';
import { Credentials } from './credentials';

export class OTPLoginRequest extends Request {

  constructor(
    public smsCode: string
  ) {
    super();
  }

}
