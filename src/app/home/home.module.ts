import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeComponent},
  {path: '**', redirectTo: ''},
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent,
    HeaderBarComponent,
    FooterBarComponent
  ]
})
export class HomeModule { }
