import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/common/service/common/common.service';
import { ShareKey } from 'src/app/common/service/share/share-key';
import { LoginResponse } from 'src/app/user/service/models/login.response';
import { DashboardService } from '../service/dashboard.service';
import { DashboardResponse } from '../service/models/dashboard-response';
import { GraphData } from '../service/models/graph-data';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  @ViewChild("viewersContainer") viewersContainer: ElementRef;
  constructor(
    public cs: CommonService ,
    public dashboardService: DashboardService
  ) { }

  public graphs: GraphData[];
  private loginResponse: LoginResponse;

  ngOnInit(): void {
    this.loginResponse = this.cs.share.get(ShareKey.LOGIN_RESPONSE) as LoginResponse;
    this.getGraphs();
  }

  private getGraphs() {
    this.dashboardService.getGraphs(this.loginResponse, (response: DashboardResponse) => {
      this.graphs = response.graphs;
    });
  }

  /*
  we need to make view height fixed
  with current height
  */
  public fixedContainerHeight() {
    let height = this.viewersContainer.nativeElement.clientHeight;
    console.log("current height:" +height);
    this.viewersContainer.nativeElement.style.height = height + 'px';
  }

}
