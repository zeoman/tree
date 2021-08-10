import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmValidParentMatcher, CustomValidators, ERROR_MESSAGES} from "../../../../core/utils/validators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {TreeService} from "../../../../core/services";

@Component({
  selector: 'app-generate-new',
  templateUrl: './tree-generator-form.component.html'
})
export class TreeGeneratorFormComponent implements OnInit {

  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  formGroup: FormGroup | undefined;
  errors = ERROR_MESSAGES;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private treeService: TreeService
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      rootNodesAmount: new FormControl('7', [
          Validators.required,
          CustomValidators.integersPositive
        ]
      ),
      childrenAmount: new FormGroup({
        childrenMin: new FormControl('2', [
          Validators.required,
          CustomValidators.integersPositive
        ]),
        childrenMax: new FormControl('5', [
          Validators.required,
          CustomValidators.integersPositive
        ]),
      }, CustomValidators.secondMustBeMore),
      deepLevel: new FormControl('5', [
        Validators.required,
        CustomValidators.integersPositive
      ]),
    })
  }

  selectValue($event: Event): void {
    // @ts-ignore
    $event.target.select();
  }

  submit(): void {
    const params = this.formGroup?.getRawValue();
    params.childrenMin = this.formGroup?.get('childrenAmount.childrenMin')?.value;
    params.childrenMax = this.formGroup?.get('childrenAmount.childrenMax')?.value;
    delete params.childrenAmount;

    Object.keys(params).forEach(param => {
      params[param] = Number(params[param]);
    })

    this.treeService.makeTreeData(params)
      .then(() => this.router.navigate(['tree-viewer']));
  }
}
