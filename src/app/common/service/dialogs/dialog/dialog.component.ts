import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateService } from '../../translate/translate.service';
import { DialogInfo } from '../dialog-info';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public message: string;
  public cancelButton: string;
  public confirmButton: string;

  constructor(
    public dialogConfig: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    public ts: TranslateService
  ) { }

  public dialogInfo: DialogInfo;
  ngOnInit(): void {
    this.dialogInfo = this.dialogConfig.data;
  }

  public onConfirm() {
    if (this.dialogInfo.onConfirm) {
      this.dialogInfo.onConfirm();
      this.ref.close();
    }
  }

  public onCancel() {
    console.log(" on cancel");
    this.ref.close();
  }

}
