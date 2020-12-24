import { UserData } from './models/user.data';
import { Injectable } from '@angular/core';
import { ConnectorService } from 'src/app/common/service/connector/connector.service';
import { Response } from 'src/app/common/models/response';
import { Credentials } from './models/credentials';
import { LoginResponse } from './models/login.response';
import { Register } from './models/register-request';
import { CommonService } from 'src/app/common/service/common/common.service';
import { Request } from 'src/app/common/models/request';
import { HttpHeaders } from '@angular/common/http';
import { OTPLoginResponse } from './models/otp-login.response';
import { OTPLoginRequest } from './models/otp-login.request';
import { LoginRequest } from './models/login.request';

export enum USER_ROLE {
  ROOT = "root", ADMIN = "admin", USER = "user"
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public static LOGIN_URL = 'user/login';
  public static REGISTER_URL = 'user/register-user';

  constructor(
    private connector: ConnectorService,
    private cs: CommonService) {
  }

  private static USER_NAME ='user-name';
  public getLastUserName() {
    return localStorage.getItem( UserService.USER_NAME);
  }



  public login(credentials: Credentials) {
    //let authOptions = this.authenticate(credentials);
    let request = new LoginRequest(credentials);
    this.connector.post(UserService.LOGIN_URL, request).then((response: LoginResponse) => {
      this.userLoggedIn(credentials,response);
    }, () => {
    });
  }


  private userLoggedIn(credentials: Credentials, response: LoginResponse) {
    this.connector.setToken(response.token);
    localStorage.setItem(UserService.USER_NAME, credentials.name);
    this.cs.navigation.openInboxes(response);
    this.cs.navigation.openSystems();
  }

  public signOut() {
    this.connector.setToken(null);
    localStorage.removeItem(UserService.USER_NAME);
  }

  public authenticate(creds: Credentials) {
    return {
      headers: new HttpHeaders({
        'userCode': creds.name,
        'password': creds.password
      })
    };
  }


  private openHome() {
    /*
    switch (UserService.lastLogin.user.role) {
      case USER_ROLE.ROOT:
        this.cs.navigation.rootDashBoard();
        break;
      case USER_ROLE.ADMIN:
        this.cs.navigation.adminDashBoard();
        break;
      case USER_ROLE.USER:
        this.cs.navigation.userHome();
        break;
    }
    */
  }


  public register(credentials: Credentials): Promise<Response> {
    return this.connector.post(UserService.REGISTER_URL, new Register(credentials));
  }


  public validateAuthentication() {
     this.connector.validateAuthentication();
  }


}
