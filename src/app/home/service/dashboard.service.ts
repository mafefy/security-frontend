import { Injectable } from '@angular/core';
import { ConnectorService } from 'src/app/common/service/connector/connector.service';
import { CommonService } from 'src/app/common/service/common/common.service';
import { SwitchDepartment } from './models/switch-department';
import { LoginResponse } from 'src/app/user/service/models/login.response';
import { Department } from './models/department';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public static SWITCH_DEP_URL = 'SwitchDepartment';


  constructor(
    private connector: ConnectorService,
    private cs: CommonService) {
  }

  public switch(request: SwitchDepartment, onSuccess: any ) {

    this.connector.authentictedPost(DashboardService.SWITCH_DEP_URL, request).then((response: LoginResponse) => {
      onSuccess(response);
    }, () => {
      this.cs.dialogsService.retryDialog(() => {
        this.switch(request, onSuccess);
      });
    });
  }


}
