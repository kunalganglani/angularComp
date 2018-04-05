import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';

import { UserService } from './user.service';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', loadChildren: './home/home.module#HomeModule'},
  {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: 'register', loadChildren: './register/register.module#RegisterModule'},
  {path: 'events', loadChildren: './events/events.module#EventsModule'},
  {path: 'members', loadChildren: './members/members.module#MembersModule'},
  {path: '**', redirectTo: 'dashboard'}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    FooterBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    HttpModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
