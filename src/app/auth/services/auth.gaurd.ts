import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if (this.authService.isLoggedIn())
        return true;
        // else navigate to login
    }
}
