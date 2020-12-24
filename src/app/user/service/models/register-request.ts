import { Request } from 'src/app/common/models/request';
import { Credentials } from './credentials';

export class Register extends Request {
    public credentials: Credentials;

    constructor(credentials: Credentials ) {
        super();
        this.credentials = credentials;
     }
    
}