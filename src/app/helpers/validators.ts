import { AbstractControl, ValidatorFn } from '@angular/forms';

export const validateExpiry = (input: string): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const unSelected = (control.value === input);
    return unSelected ? {unselected: {value: control.value}} : null;
  };
};
