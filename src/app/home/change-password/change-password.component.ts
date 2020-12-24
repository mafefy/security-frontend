import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Response } from 'src/app/common/models/response';
import { CommonService } from 'src/app/common/service/common/common.service';
import { DialogInfo } from 'src/app/common/service/dialogs/dialog-info';
import { ChangeAdminPassword } from '../service/models/change-admin-password-request';
import { User } from '../service/models/user';
import { SystemsService } from '../service/systems.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


  userform: FormGroup;
  private user: User;

  constructor(
    private fb: FormBuilder,
    private systemsService: SystemsService,
    private cs: CommonService
  ) {

  }

  ngOnInit() {
    this.user = this.cs.share.get(User.USER) as User;
    this.userform = this.fb.group({
      'password': new FormControl('', this.minValidators(4)),
      'confirmPassword': new FormControl('', this.minValidators(4))
    }, { validator: this.passwordMatchValidator });

  }


  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : { 'mismatch': true };
  }

  private minValidators(min: number) {
    return Validators.compose([Validators.required, Validators.minLength(min)]);
  }

  public onSubmit(value: string) {

    let request = new ChangeAdminPassword();
    request.id = this.user.id;
    request.newPassword = this.userform.value.password;
    this.systemsService.changePassword(request, (respnse: Response) => {
      this.cs.dialogsService.confirm(new DialogInfo('done-successfully', 'password-changed-success',
        () => {
          this.cs.navigation.openSystems();
        }));

    });


  }


}
