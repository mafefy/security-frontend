import { AppError } from './app-error';

export class Response {
    public success: boolean;
    public error: AppError;
    /* new system */

    // to be removed
    // to be removed

    public presentTo: string;
    public presentToDept: string;
    public ErrorMessage: string;
    public Status: number;
    public CustomActions: string;
    public Logo: string;
    public LogoOnline: string;
    public LogoOffline: string;
    public Pincode: string;
    public ServiceType: string;
    public Signature: string;
    public SignatureId: string;
    public Sections: string;
    public UserDetails: string;
    public UserId: number;
    public DepartmentName: string;
    public VoiceNoteMaximumDuration: string;
    public VisualTrackingURL: string;
    public UserGctId: string;
    public StructureId: string;
    public InboxesOrder: string;
    public InboxesType: string;
    public BAMUrl: string;
    public contact_id: string;
    public department_id: string;
    public secLevel: string;
    public AdvancedSearchString: string;
    public AdvancedSearchInboxType: string;
    public customToolBarActionIcons;



}
