import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { HttpModule } from '@angular/http';
import { AuthGuard } from '../auth/services/auth.gaurd';
import { CoreModule } from '../shared/core/core.module';

const routes: Routes = [
  { path: '', component: MembersComponent, canActivate: [AuthGuard] },
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
