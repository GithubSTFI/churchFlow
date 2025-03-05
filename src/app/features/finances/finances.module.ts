import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingComponent } from './components/tracking/tracking.component';
import { ReportsComponent } from './components/reports/reports.component';



@NgModule({
  declarations: [
    TrackingComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FinancesModule { }
