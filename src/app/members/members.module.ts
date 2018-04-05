import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  { path: '', component: MembersComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MembersComponent]
})
export class MembersModule { }
