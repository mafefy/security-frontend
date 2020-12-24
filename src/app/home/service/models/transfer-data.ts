import { IdValue } from './id-value';
import { RecipientsGroup } from './recipients-group';

export class TransferData {
    public customizedTransferDepartment: IdValue  [] ;
    public Purposes: IdValue [];
    public Priorities: IdValue [];
    public DocumentSecurityLevel: IdValue [];
    public Recipients: RecipientsGroup [];
}
