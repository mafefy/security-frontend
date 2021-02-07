import { Injectable } from '@angular/core';
import { Response } from 'src/app/common/models/response';
import { CommonService } from 'src/app/common/service/common/common.service';
import { ConnectorService } from 'src/app/common/service/connector/connector.service';
import { AddAccountRequest } from 'src/app/user/service/models/add-account.request';
import { AddUserRequest } from './models/add-user-request';
import { ChangeAdminPassword } from './models/change-admin-password-request';
import { SuspendUserRequest } from './models/suspend-user-request copy';
import { User } from './models/user';
import { UserIdRequest } from './models/user-id-request';
import { UsersListRequest } from './models/users-list.request';
import { UsersListResponse } from './models/users-list.response';

@Injectable({
  providedIn: 'root'
})
export class SystemsService {

  public static ACCOUNTS_LIST = 'user/accounts-list';
  public static ADD_ACCOUNT = 'user/add-account';
  public static DELETE_SYSTEM = 'user/delete-account';
  public static SUSPEND_ACCOUNT = 'user/suspend-account';
  public static CHANGE_ADMIN_PASSWORD = 'user/change-admin-password';


  constructor(
    private connector: ConnectorService,
    private cs: CommonService) {
  }

  public systemsList(request: UsersListRequest, onSuccess: any) {

    this.connector.authentictedPost(SystemsService.ACCOUNTS_LIST, request).then((response: UsersListResponse) => {
      onSuccess(response);
    }, (response: Response) => {
      this.cs.dialogsService.retryDialog(() => {
        this.systemsList(request, onSuccess);
      },response.error.message);
    });
  }

  public addSystem(request: AddAccountRequest, onSuccess: any) {

    this.connector.authentictedPost(SystemsService.ADD_ACCOUNT, request).then((response: Response) => {
      onSuccess(response);
    }, (response: Response) => {
      this.cs.dialogsService.retryDialog(() => {
        this.addSystem(request, onSuccess);
      }, response.error.message);
    });
  }

  public deleteSystem(user: User, onSuccess: any) {

    let request = new UserIdRequest();
    request.id = user.id;

    this.connector.authentictedPost(SystemsService.DELETE_SYSTEM, request).then((response: Response) => {
      onSuccess(response);
    }, (response: Response) => {
      this.cs.dialogsService.retryDialog(() => {
        this.deleteSystem(user, onSuccess);
      },response.error.message);
    });
  }



  public suspendAccount(user: User, suspend: boolean, onSuccess: any) {

    let request = new SuspendUserRequest();
    request.id = user.id;
    request.suspend = suspend;

    this.connector.authentictedPost(SystemsService.SUSPEND_ACCOUNT, request).then((response: Response) => {
      onSuccess(response);
    }, (response: Response) => {
      this.cs.dialogsService.retryDialog(() => {
        this.suspendAccount(user, suspend, onSuccess);
      }, response.error.message);
    });
  }


  public changePassword(request: ChangeAdminPassword, onSuccess: any) {

    this.connector.authentictedPost(SystemsService.CHANGE_ADMIN_PASSWORD, request).then((response: Response) => {
      onSuccess(response);
    }, (response: Response) => {
      this.cs.dialogsService.retryDialog(() => {
        this.changePassword(request, onSuccess);
      }, response.error.message);
    });
  }
}
