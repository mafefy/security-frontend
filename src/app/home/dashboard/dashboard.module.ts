import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { GraphViewComponent } from './graph-view/graph-view.component';
import {ChartModule} from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [DashboardHomeComponent, GraphViewComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    DashboardRoutingModule,
    ChartModule,
    ToastModule,
    ButtonModule
  ]
})
export class DashboardModule { }
