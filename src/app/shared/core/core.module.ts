import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MaterialModule } from '../material.module';
import { SpinnerService } from '../spinner/spinner.service';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SpinnerComponent
  ],
  providers: [ SpinnerService],
  declarations: [SpinnerComponent]
})
export class CoreModule { }
