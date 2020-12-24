import { AuditingData } from 'src/app/common/models/auditing-data';

export class UserData extends AuditingData{
    public name: string;
    public middleName: string;
    public lastName: string;
    public activated: boolean;
    public suspended: boolean;
    public address: string;
    public role: string;
}