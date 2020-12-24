import { InstallService } from './../../common/service/install.service';
import { CommonService } from './../../common/service/common/common.service';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userform: FormGroup;
  smsForm: FormGroup;
  smsRequired = false;
  enableResend = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cs: CommonService,
    private pwaService: InstallService
  ) {

  }

  ngOnInit() {
    this.initializeForms();

  }

  private initializeForms() {
    let lastUserNmae = this.userService.getLastUserName() || '';

    this.userform = this.fb.group({
      'name': new FormControl(lastUserNmae, this.minValidators(2)),
      'password': new FormControl('', this.minValidators(4))
    });

    this.processPWAInstallation();

  }



  onLogin() {
    this.userService.login(this.userform.value );
  }

  openRegister() {
    this.cs.navigation.userRegister();
  }

  private minValidators(min: number) {
    return Validators.compose([Validators.required, Validators.minLength(min)]);
  }
  /*
check if app is pwa and installable
we show install button
and if first time we show install dialog also
*/
  private processPWAInstallation() {
    let key = "pw-install-key";
    this.pwaService.registerBeforeInstallEvent(() => {
      this.isPWAInstallable = true;

      if (!localStorage.getItem(key)) {
        this.showInstallDialog = true;
        localStorage.setItem(key, "already-asked");
      }
    });
  }
  public isPWAInstallable = false;
  public showInstallDialog = false;

  public onInstall() {
    this.pwaService.promptInstallation(() => {
      this.isPWAInstallable = false;
      this.showInstallDialog = false;
    }, () => {
      this.showInstallDialog = false;
    });
  }


}
