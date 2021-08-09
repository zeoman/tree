import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmValidParentMatcher, CustomValidators, ERROR_MESSAGES} from "../../../core/utils/validators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HOMEPAGE} from "../../../core/constants";
import {UserService} from "../../../core/services";
import {IUser} from "../../../core/interfaces/user.inteface";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  formGroup: FormGroup | undefined;
  errors = ERROR_MESSAGES;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userService.userData$
      .pipe(
        filter(user => !!user)
      )
      // @ts-ignore
      .subscribe(user => this.formGroup = this.createFormGroup(user))
  }

  createFormGroup(data: IUser): FormGroup {
    return new FormGroup({
      login: new FormControl(data.login, Validators.required),
      password: new FormGroup({
        password1: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required)
      }, CustomValidators.childrenEqual),
      male: new FormControl(data.male),
      dateOfBirth: new FormControl(data.dateOfBirth),
      email: new FormControl(data.email, Validators.email)
    })
  }

  backToPreviousPage(): void {
    history.back();
  }

  submit(): void {
      this.userService.modifyUser(this.formGroup?.getRawValue())
        .subscribe(
          response => {
            if (response.result === 'ok') {
              this.snackBar.open(response.data, 'Ok', {panelClass: 'snackbar-success'});
              this.router.navigate([HOMEPAGE])
            }
          }
        )
    }

}
