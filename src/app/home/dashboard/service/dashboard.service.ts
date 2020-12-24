import { Injectable } from '@angular/core';
import { AuthenticatedUserRequest } from 'src/app/common/models/authenticated-user-request';
import { CommonService } from 'src/app/common/service/common/common.service';
import { ConnectorService } from 'src/app/common/service/connector/connector.service';
import { LoginResponse } from 'src/app/user/service/models/login.response';
import { DashboardRequest } from './models/dashboard-request';
import { DashboardResponse } from './models/dashboard-response';
import { DashboardZoomResponse } from './models/dashboard-zoom-response';
import { GraphData, GraphType } from './models/graph-data';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public static DASHBOARD_GRAPH = 'dashboard/graph';
  public static DASHBOARD_GRAPH_ZOOM = 'dashboard/graph_zoom';

  constructor(
    public cs: CommonService,
    public connector: ConnectorService
  ) { }

  public getGraphs(loginResponse: LoginResponse, onSuccess: any) {

    onSuccess(this.sample());
    return;
    let request = new DashboardRequest(false);
    this.connector.initializeFromLogin(request, loginResponse);

    this.connector.authentictedPost(DashboardService.DASHBOARD_GRAPH, request).then((response: DashboardResponse) => {
      onSuccess(response);
    }, () => {
      this.cs.dialogsService.retryDialog(() => {
        this.getGraphs(loginResponse, onSuccess);
      });
    });

  }


  public getZoomedGraph(request: DashboardRequest ,loginResponse: LoginResponse, onSuccess: any) {

    onSuccess(this.zoomSample());
    return;
    this.connector.initializeFromLogin(request, loginResponse);

    this.connector.authentictedPost(DashboardService.DASHBOARD_GRAPH_ZOOM, request).then((response: DashboardZoomResponse) => {
      onSuccess(response);
    }, () => {
      this.cs.dialogsService.retryDialog(() => {
        this.getZoomedGraph(request,loginResponse, onSuccess);
      });
    });

  }

  private sample() {
    let r = new DashboardResponse();
    r.graphs = [];
    r.graphs.push(this.grpahSample3());
    r.graphs.push(this.grpahSample1());
    r.graphs.push(this.graphSample2());
    return r;
  }

  private zoomSample() {
    let r = new DashboardZoomResponse();
    //r.graphs.push(this.grpahSample1());
    r.graph = this.grpahSample1();
    return r;
  }


  private grpahSample3(): any {
    return {
      title: "Title 3",
      labels: ['January', 'February', 'March', 'April', 'May'],
      intervals: ['1/1/1989', '1/1/1992', '1/1/1995', '1/1/2000', '1/1/2010'],
      graphType : GraphType.BAR,
      zoomable: false,
      datasets: [
        {
          label: 'set1',
          backgroundColor: 'magenta',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56]
        },
        {
          label: 'set2',
          backgroundColor: 'yellow',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86]
        },
        {
          label: 'set3',
          backgroundColor: 'cyan',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86]
        }
      ]
    };
  }


  private grpahSample1(): any {
    return {
      title: "Title 1",
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      intervals: ['1/1/1989', '1/1/1992', '1/1/1995', '1/1/2000', '1/1/2010', '1/1/2011', '1/1/2012'],
      graphType : GraphType.LINE,
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
  }

  private graphSample2(): any {
    return {
      title: "Title 2",
      labels: ['January', 'February', 'March'],
      intervals: ['1/1/1989', '1/1/1992', '1/1/1995'],
      zoomable: true,
      graphType : GraphType.LINE,
      datasets: [
        {
          label: 'First Dataset',
          backgroundColor: 'orange',
          borderColor: 'orange',
          data: [65, 59, 80]
        },
        {
          label: 'Second Dataset',
          backgroundColor: 'green',
          borderColor: 'green',
          data: [28, 48, 40]
        }
      ]
    };
  }

}
