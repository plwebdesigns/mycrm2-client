import { Directive } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Directive({
  selector: '[appMustMatch]'
})
export class MustMatchDirective {

  constructor() { }

}

export function mustMatch(controlName: string, matchingControlName: string) {

  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];


    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      return null;
    }

  };
  
}
