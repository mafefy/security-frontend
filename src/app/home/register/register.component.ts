import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Response } from 'src/app/common/models/response';
import { CommonService } from 'src/app/common/service/common/common.service';
import { DialogInfo } from 'src/app/common/service/dialogs/dialog-info';
import { TranslateService } from 'src/app/common/service/translate/translate.service';
import { AddAccountRequest } from 'src/app/user/service/models/add-account.request';
import { Credentials } from 'src/app/user/service/models/credentials';
import { UserRole } from '../service/models/user.role';
import { SystemsService } from '../service/systems.service';

interface Role {
  name: string;
  code: string;
}

@Component({
  selector: 'user-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userform: FormGroup;
  roles: Role [];

  constructor(
    private fb: FormBuilder,
    private systemsService: SystemsService,
    private cs: CommonService,
    private ts: TranslateService
  ) {

  }

  ngOnInit() {
    this.roles =   [
      { name: this.ts.get("root-role")  , code: UserRole.ROOT},
      { name: this.ts.get("admin-role")  , code: UserRole.ADMIN},
      { name: this.ts.get("user-role")  , code: UserRole.USER}
    ];

    this.userform = this.fb.group({
      'name': new FormControl('', this.minValidators(2)),
      'systemId': new FormControl('', this.minValidators(4)),
      'role': new FormControl( UserRole.ADMIN, Validators.compose([Validators.required]) ),
      'password': new FormControl('', this.minValidators(4)),
      'confirmPassword': new FormControl('', this.minValidators(4)),
    }, { validator: this.passwordMatchValidator });

  }


  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : { 'mismatch': true };
  }

  private minValidators(min: number) {
    return Validators.compose([Validators.required, Validators.minLength(min)]);
  }

  public onSubmit(value: string) {
    let formData = this.userform.value;
    console.log( this.userform.value);
    let request = new AddAccountRequest();
    request.credentials = new Credentials(formData.name,formData.password);
    request.systemId = formData.systemId;
    request.role = formData.role;
    this.systemsService.addSystem( request , (respnse: Response) => {
      if (respnse.success) {
        this.cs.dialogsService.confirm(new DialogInfo('done-successfully', 'valid-account',
          () => {
            this.cs.navigation.openSystems();
          }));
      }
    });


  }


}
