import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TreeService} from "../services";
import {tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class TreeExistsGuard implements CanActivate {

  constructor(
    private treeService: TreeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }
  canActivate(): Observable<boolean> {
    return this.treeService.isTreeExists$
      .pipe(tap(isTreeExists => {
        if (!isTreeExists) {
          this.snackBar.open('Tree does not exist.', 'Ok', {panelClass: 'snackbar-error'});
          this.router.navigate(['generate-tree']);
        }
      }))
  }

}
