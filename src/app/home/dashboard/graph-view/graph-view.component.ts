import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/common/service/common/common.service';
import { ShareKey } from 'src/app/common/service/share/share-key';
import { LoginResponse } from 'src/app/user/service/models/login.response';
import { DashboardService } from '../service/dashboard.service';
import { DashboardRequest } from '../service/models/dashboard-request';
import { DashboardResponse } from '../service/models/dashboard-response';
import { DashboardZoomResponse } from '../service/models/dashboard-zoom-response';
import { DataSet } from '../service/models/dataset';
import { GraphData, GraphType } from '../service/models/graph-data';

@Component({
  selector: 'graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})
export class GraphViewComponent implements OnInit {

  @Output() onUpdate = new EventEmitter();
  //queue for zoom in levels of graphs
  public zoomLevels: GraphData[] = [];
  public zoomLevel = 0;

  public graphOptions: any;
  private loginResponse: LoginResponse;
  constructor(
    public cs: CommonService,
    public dashboardService: DashboardService) {

  }

  ngOnInit(): void {
    this.loginResponse = this.cs.share.get(ShareKey.LOGIN_RESPONSE) as LoginResponse;
    this.setGraphOptions("");
  }

  private setGraphOptions(title: string) {
    this.graphOptions = {
      title: {
        display: true,
        text: title,
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  @Input()
  set graph(graphData: GraphData) {
    this.appendGraphLevel(graphData);
  }

  private appendGraphLevel(graphData: GraphData) {
    graphData.datasets.forEach(set => {
      set.pointHitRadius = 20;
      set.fill = graphData.graphType == GraphType.LINE ? false : true;
    });

    this.setGraphOptions(graphData.title);
    this.zoomLevels.push(graphData);
    this.zoomLevel = this.zoomLevels.length -1;
  }

  public currentGraph(): GraphData {
    if (this.zoomLevels.length > 0) {
      return this.zoomLevels[this.zoomLevel];
    }
    return null;
  }


  //let dataSetIndex =  event.element._datasetIndex ;
  //let dataSet: DataSet = this.graphData.datasets[event.element._datasetIndex] ;
  //let yValue = dataSet.data[event.element._index];

  onDataSelected(event: any) {
    this.onUpdate.emit();
    let graph = this.currentGraph();
    if (graph.zoomable) {

      if ( (this.zoomLevel+1) >= this.zoomLevels.length  ) {
        this.loadNextZoomLevel(graph,event.element._index);
      }  else  /*zooming in already loaded level*/ {
        this.zoomLevel++;
      }

    } else {
      this.cs.infoMessage( 'information','no-more-details', true);
    }

  }

  private loadNextZoomLevel(graph: GraphData, sampleIndex: number) {
    let interval = graph.intervals[sampleIndex];

    let zoomRequest = new DashboardRequest(true);
    zoomRequest.graphId = graph.id;
    zoomRequest.interval = interval;

    this.dashboardService.getZoomedGraph(zoomRequest, this.loginResponse, (response: DashboardZoomResponse) => {
      this.appendGraphLevel( response.graph);
    });

  }
  public onZoomOut() {
    this.zoomLevel = (--this.zoomLevel) <= 0 ? 0 : this.zoomLevel;
  }
}
