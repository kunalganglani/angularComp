import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { HttpModule } from '@angular/http';
import { AuthGuard } from '../auth/services/auth.gaurd';
import { CoreModule } from '../shared/core/core.module';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard],
    children: [
      {
        path: 'list', component: MembersComponent,
        /* children: [
          {
            path: 'add-device', data: { title: 'Add Device' },
            component: AddEditDeviceDialogComponent
          },
          {
            path: 'edit-device/:id',
            component: AddEditDeviceDialogComponent,
            data: { title: 'Edit Device' }
          }] */
      },
      { path: '**', redirectTo: 'list' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MembersComponent]
})
export class MembersModule { }
