import { GraphData } from './graph-data';

export class DashboardResponse  extends Response{

  public graphs : GraphData []; // all graphs lists
}
