import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../auth/services/auth.gaurd';
import { MaterialModule } from '../shared/material.module';
import { CoreModule } from '../shared/core/core.module';
const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  data: {
    title: 'Dashboard'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
