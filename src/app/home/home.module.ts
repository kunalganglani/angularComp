import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule} from '../shared/material.module';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeComponent},
  {path: '**', redirectTo: ''},
  ];

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent,
  ]
})
export class HomeModule { }
