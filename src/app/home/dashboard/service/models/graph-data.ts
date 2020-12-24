import { DataSet } from './dataset';

export class GraphData {
  public id: string;
  public zoomable: boolean;
  public graphType: GraphType; // bar , line
  public title: string;
  public labels: string[];// x values
  public intervals: string[];// x values
  public datasets: DataSet[];// data set series
}

export enum GraphType  {
  BAR = 'bar', LINE = 'line' , PIE = 'pie'
}


