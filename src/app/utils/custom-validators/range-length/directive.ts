import { Directive, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

import { rangeLength } from './validator';

const RANGE_LENGTH_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => RangeLengthValidator),
  multi: true,
};

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[rangeLength][formControlName],[rangeLength][formControl],[rangeLength][ngModel]',
  providers: [RANGE_LENGTH_VALIDATOR],
})
export class RangeLengthValidator implements Validator, OnInit, OnChanges {
  @Input() rangeLength!: [number];

  private validator!: ValidatorFn;
  private onChange!: () => void;

  ngOnInit() {
    this.validator = rangeLength(this.rangeLength);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'rangeLength') {
        this.validator = rangeLength(changes[key].currentValue);
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
