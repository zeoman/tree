import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services";
import {ConfirmValidParentMatcher, CustomValidators, ERROR_MESSAGES} from "../../../core/utils/validators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HOMEPAGE} from "../../../core/constants";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  formGroup: FormGroup | undefined;
  errors = ERROR_MESSAGES;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormGroup({
        password1: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required)
      }, CustomValidators.childrenEqual),
      male: new FormControl(),
      dateOfBirth: new FormControl(),
      email: new FormControl('', Validators.email)
    })
  }

  submit(): void {
    const user = this.formGroup?.getRawValue();
    user.password = user.password.password1; // Get Value from first input
    this.authService.register(user)
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
