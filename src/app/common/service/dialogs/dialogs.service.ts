import { DialogInfo } from './dialog-info';
import { TranslateService } from './../translate/translate.service';
import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogComponent } from './dialog/dialog.component';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  private static dismissedSubscription: Subscription;
  private static previousDialog: DynamicDialogRef;
  constructor(
    public ts: TranslateService,
    public dynamicDialogs: DialogService) {
  }

  public confirm(info: DialogInfo) {
    info.cancelButton = null;
    info.onCancel = null;
    this.cleanAllPreviousDialogs();

    const ref = this.dynamicDialogs.open(DialogComponent, {
      data: info,
      header: this.ts.get(info.headerTS),
      width: info.width,
      dismissableMask: true,
      closable: true
    });
    this.onDismissed(ref, info);

  }

  private clean(ref: DynamicDialogRef) {

    if (DialogsService.previousDialog) {
      console.log(" clean previous dialog");
      DialogsService.previousDialog.close();
    }
    //DialogsService.previousDialog = ref;

  }


  private cleanAllPreviousDialogs() {


    var inputs = document.getElementsByTagName('p-dynamicdialog');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].remove();
    }
  }



  private onDismissed(ref: DynamicDialogRef, info: DialogInfo) {
    DialogsService.dismissedSubscription = ref.onClose.subscribe(() => {
      console.log(" on dismissed called");
      DialogsService.previousDialog = null;
      if (info.onCancel) {
        console.log("user  cancel() called");
        info.onCancel();
      }
    });
  }

  public dialog(info: DialogInfo) {
   this.cleanAllPreviousDialogs();
    const ref = this.dynamicDialogs.open(DialogComponent, {
      data: info,
      header: this.ts.get(info.headerTS),
      width: info.width,
      dismissableMask: true,
      closable: true
    });
    this.onDismissed(ref, info);

  }

  public retryDialog(handler: any, subMessage = null) {
    let info = new DialogInfo('retry', 'retry-request', () => {
      handler();
    }, () => {

    });
    info.confirmButton = 'yes';
    info.cancelButton = 'no';
    info.subMessage = subMessage;
    this.dialog(info);
  }


  public okDialog(feedback = null) {
    this.confirm(new DialogInfo( 'success' , 'done-successfully', () => {
      if ( feedback) {
        feedback();
      }
    }));
  }
}
