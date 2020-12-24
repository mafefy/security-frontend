import { Credentials } from './../../../user/service/models/credentials';
import { TranslateService } from './../translate/translate.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Request } from '../../models/request';
import { Response } from '../../models/response';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { finalize, tap } from 'rxjs/operators';
import { CommonService } from '../common/common.service';
import { ErrorCode } from '../../models/error-code';
import { AuthenticatedRequest } from '../../models/authenticated-request';
import { ProgressService } from '../progress/progress.service';
import { AuthenticatedUserRequest } from '../../models/authenticated-user-request';
import { LoginResponse } from 'src/app/user/service/models/login.response';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {

  //private static HOST = 'http://cts.alriyadh.gov.sa:7077/IPAD/CTSUtilities/ctsActions/';
  private static HOST ;
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService,
    private ts: TranslateService,
    private progressService: ProgressService) {

  }


  public async loadHost() {
    ConnectorService.HOST = ""; /*"http://localhost:80/";*/
    /*
    let hostPath =  'assets/data/host.json';
    await this.httpClient.get<any>(hostPath).toPromise().then( (data) => {
      ConnectorService.HOST = data.host;
    }, () => {
      console.log("retry to fetch host information");
      setTimeout( () => this.loadHost() ,1 * 60 * 1000);
    });
    */
  }

  public getService(service: string): string {
    return ConnectorService.HOST + service;
  }



  private static token: string;
  public setToken(token: string) {
    ConnectorService.token = token;
  }

  private authenticteRequest(request: AuthenticatedRequest) {
    if ( this.validateAuthentication() ) {
      request.token = ConnectorService.token;
    }
  }

  public validateAuthentication(): boolean {
    if ( ConnectorService.token) {
      return true;
    } else {
      this.showMessage(this.ts.get('error-expired-login'));
      this.commonService.navigation.userLogin();
      return false;
    }
  }


  private startProgressBar(): string {
    let id = (Math.random() * 10000000 ).toString();
    this.progressService.start(id);
    return id;
  }

  public post(service: string, request: Request, options = null): Promise<any> {
    let progressBarId = this.startProgressBar();

    return new Promise(async (resolve, reject) => {

      let response = await this.httpClient.post<any>(this.getService(service), request)
        .pipe(
          timeout(ConnectorService.TIME_OUT),
          tap(
            data => this.handleResponse(data,progressBarId),
            error => this.logError(error, reject,progressBarId)
          )
        ).toPromise();


      if (this.validResponse(response)) {
        resolve(response);
      } else {
        reject(response);
      }

    });

  }

  private static TIME_OUT =  30 * 1000;
  public authentictedPost(service: string, request: Request): Promise<any> {
    let progressBarId=this.startProgressBar();
    return new Promise(async (resolve, reject) => {
      (request);

      let response = await this.httpClient.post<any>(this.getService(service), this.initializeRequest(request))
        .pipe(
          timeout(ConnectorService.TIME_OUT),
          tap(
            data => this.handleResponse(data,progressBarId),
            error => this.logError(error, reject,progressBarId)
          )
        ).toPromise();


      if (this.validResponse(response)) {
        resolve(response);
      } else {
        reject(response);
      }

    });

  }




  private initializeRequest(request: Request) {
    this.authenticteRequest(request as AuthenticatedRequest);
    request.language = this.ts.getCurrentLanguage();
    return request;
  }


  /*
  public post<T extends Response>(service: string, request: Request ): Promise<T> {
    return new Promise(async (resolve, reject) => {


      let response = await this.httpClient.post<T>(this.getService(service), request)
        .pipe(
          tap(
            data => this.handleResponse(data),
            error => this.logError(error)
          )
        ).toPromise();

      if (response.success) {
        resolve(response);
      } else {
        reject();
      }
    });

  }
  */


  public logError(error: any, reject: any,progressBarId) {
    this.progressService.stop(progressBarId);
    this.showMessage(this.ts.get('error-failure'));
    reject({error: {
      message: this.ts.get('error-failure')
    }});
  }

  private handleResponse(response,progressBarId) {
    this.progressService.stop(progressBarId);
    if (this.validResponse(response)) {
      this.commonService.clearMessages();
    } else {
      this.showMessage(response.error.message || this.ts.get('error-failure'));
    }


  }

  private validResponse(response): boolean {
    return response ? response.success : false;
  }


  private showMessage(message: string) {
    this.commonService.errorMessage(this.ts.get('error'), message, false);
  }

  public getToken(): string {
    return ConnectorService.token;
  }

  public initializeFromLogin(request: AuthenticatedUserRequest, loginResponse: LoginResponse) {
    request.appCode = loginResponse.appCode;
    request.departmentId = loginResponse.department_id;
    request.contactId = loginResponse.contact_id;
    request.userId = loginResponse.UserId;
  }

}
