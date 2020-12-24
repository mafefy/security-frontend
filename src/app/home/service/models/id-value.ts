
export class IdValue {
    public Id: string;
    public Value: string;
    public Value_ar: string;
    /*
    these values filled based on user actions in TransferComponent
    */
    public isCopy?: boolean;
    public isTransfer?: boolean;
    public enableActions?: boolean;
    public actions?: any;
    public priorityLevel?: number;
    public securityLevel?: number
    public guidance?: number;

    public static contains(idValue: IdValue  , pattern: string): boolean {
        return idValue.Value.indexOf(pattern) >= 0;
    }

}
