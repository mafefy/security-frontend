import { IdValue } from 'src/app/home/service/models/id-value';
import { AppInfo } from './app.info';
import { Response } from 'src/app/common/models/response';
import { Inboxes } from './Inboxes';
import { Department } from './department';
import { TransferData } from './transfer-data';

export class DashBoardResponse extends Response {
  public Inboxes: Inboxes;
  public allDepartmentsInfo: Department[];
  /* default department information */
  public department_id: string;
  public DepartmentName: string;

  public allAppsInfo: AppInfo[];
  /* default application information */

  public TransferData: TransferData;
  public SearchRecipients: IdValue[];
  public appName: string;
  public appCode: string;
  public appId: string;
}

