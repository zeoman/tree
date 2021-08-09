import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ERROR_MESSAGES} from "../../../core/utils/validators";
import {AuthService} from "../../../core/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HOMEPAGE} from "../../../core/constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup | undefined;
  errors = ERROR_MESSAGES;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  submit(): void {
    const { login, password } = this.formGroup?.getRawValue();
    this.authService.login(login, password)
      .subscribe(
        response => {
          if (response.result === 'ok') {
            this.snackBar.open(response.data, 'Ok', {panelClass: 'snackbar-success'});
            this.router.navigate([HOMEPAGE])
          } else {
            this.snackBar.open(response.data, 'Ok', {panelClass: 'snackbar-error'});
          }
        }
      )
  }
}
