import {FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {ErrorStateMatcher} from "@angular/material/core";

export class CustomValidators {
  /**
   * Validates that child controls in the form group are equal
   */
  static childrenEqual: ValidationErrors | null = (formGroup: FormGroup) => {
    const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
    const isValid = otherControlNames.every(controlName =>
      formGroup.get(controlName)?.value === formGroup.get(firstControlName)?.value);
    return isValid ? null : { notEqual: true };
  }

  static secondMustBeMore: ValidationErrors | null = (formGroup: FormGroup) => {
    const [firstControlName, secondControlName] = Object.keys(formGroup.controls || {});
    let firstValue = formGroup.get(firstControlName)?.value;
    let secondValue = formGroup.get(secondControlName)?.value;
    if (!!!firstValue || firstValue === '' || !!!secondValue || secondValue === '') {
      return;
    }
    return firstValue <= secondValue ? null : { secondMustBeMore: true };
  }

  // @ts-ignore
  static integersPositive: ValidatorFn = (formControl: FormControl) => {
    if (!!!formControl.value || formControl.value === '' || formControl.value === '0') {
      return;
    }
    const regExp = /[^0-9]/g;
    return regExp.test(formControl.value) ? {integersPositive: true} : null;
  }
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl): boolean {
    return (control?.parent?.invalid ?? false) && (control?.touched ?? false);
  }
}

/**
 * Collection of reusable error messages
 */
export const ERROR_MESSAGES: { [key: string]: string } = {
  email: 'Email must be in format "username@domain".',
  notEqual: 'Passwords must be equal.',
  integersPositive: 'Only positive integers allowed.',
  required: 'This field is required.',
  secondMustBeMore: 'Second value must be more or equals first.'
};
