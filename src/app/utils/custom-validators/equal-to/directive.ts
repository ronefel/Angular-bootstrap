import { Directive, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

import { equalTo } from './validator';

const EQUAL_TO_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EqualToValidator),
  multi: true,
};

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[equalTo][formControlName],[equalTo][formControl],[equalTo][ngModel]',
  providers: [EQUAL_TO_VALIDATOR],
})
export class EqualToValidator implements Validator, OnInit {
  @Input() equalTo!: FormControl;

  private validator!: ValidatorFn;

  ngOnInit() {
    this.validator = equalTo(this.equalTo);
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.validator(c);
  }
}
