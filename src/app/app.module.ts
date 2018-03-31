import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { UserService } from './user.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard'},
  {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: '**', redirectTo: 'login'}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    FooterBarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
