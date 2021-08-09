import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
  canActivate(): Observable<boolean> {
    return this.authService.isAuthorized().pipe(
      tap(isAuthorized => {
        if (!isAuthorized) {
          this.router.navigate(['auth/login'])
        }
      })
    )
  }

}
