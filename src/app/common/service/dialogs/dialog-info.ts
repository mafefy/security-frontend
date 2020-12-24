export class DialogInfo {
  public subMessage: string;
    constructor(
        public headerTS: string,
        public messageTS: string,
        public onConfirm: any,
        public onCancel?: any,
        public confirmButton = "ok",
        public cancelButton =  "cancel",
        public data?: any,
        public width = "80%",
    ) {

    }
}
