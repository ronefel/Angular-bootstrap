import { Directive, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

import { arrayLength } from './validator';

const ARRAY_LENGTH_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ArrayLengthValidator),
  multi: true,
};

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[arrayLength][formControlName],[arrayLength][formControl],[arrayLength][ngModel]',
  providers: [ARRAY_LENGTH_VALIDATOR],
})
export class ArrayLengthValidator implements Validator, OnInit, OnChanges {
  @Input() arrayLength!: number;

  private validator!: ValidatorFn;
  private onChange!: () => void;

  ngOnInit() {
    this.validator = arrayLength(this.arrayLength);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'arrayLength') {
        this.validator = arrayLength(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.validator(c);
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
