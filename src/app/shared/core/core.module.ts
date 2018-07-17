import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MaterialModule } from '../material.module';
import { SpinnerService } from '../spinner/spinner.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './services/confirm-dialog.service';
import { BarChartComponent } from './bar-chart/bar-chart.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SpinnerComponent, BarChartComponent
  ],
  providers: [ SpinnerService, ConfirmDialogService],
  declarations: [SpinnerComponent, ConfirmDialogComponent, BarChartComponent],
  entryComponents: [ ConfirmDialogComponent ]
})
export class CoreModule { }
