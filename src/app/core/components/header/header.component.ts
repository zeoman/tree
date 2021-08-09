import { Component, OnInit } from '@angular/core';
import {AuthService, SidebarService, UserService} from "../../services";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username$: Observable<string | null> | undefined;

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.username$ = this.userService.username$;
  }

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  logout(): void {
    this.authService.logout().subscribe(
      response => {
        if (response.result === 'ok'){
          this.snackBar.open(response.data, 'Ok', {panelClass: 'snackbar-success'});
          this.router.navigate(['/auth/login'])
        }
      }
    )
  }

}
