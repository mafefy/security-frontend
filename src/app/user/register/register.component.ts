import { Component, OnInit } from '@angular/core';
import { UserService } from './../service/user.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Response } from 'src/app/common/models/response';
import { CommonService } from 'src/app/common/service/common/common.service';
import { DialogInfo } from 'src/app/common/service/dialogs/dialog-info';

@Component({
  selector: 'user-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cs: CommonService
  ) {

  }

  ngOnInit() {
    this.userform = this.fb.group({
      'name': new FormControl('', this.minValidators(2)),
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
    this.userService.register(this.userform.value).then((respnse: Response) => {
      if (respnse.success) {
        this.cs.dialogsService.confirm(new DialogInfo('done-successfully', 'wait-membership',
          () => {
            this.cs.navigation.userLogin();
          }));
      }
    });
  }


}
