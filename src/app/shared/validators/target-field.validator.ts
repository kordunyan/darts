import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

const MAX_INPUT_NUMBER = 22;
const MIN_INPUT_NUMBER = 1;
const TARGET_REGEX = /^[\d]*$/;


@Directive({
    selector: '[appTargetFieldValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: TargetFieldValidator, multi: true}]
})
export class TargetFieldValidator implements Validator {

    validate(control: AbstractControl): {[key: string]: any} | null {
        if (!TARGET_REGEX.test(control.value)) {
            return {'invalidFormat': {valid: false}};
        }
        if (control.value.length === 0) {
            return null;
        }
        if (this.isInvalidRange(parseInt(control.value))) {
            return {'invalidRange': {valid: false}};
        }
        return null;
    }

    isInvalidRange(value) {
        return isNaN(value) || value < MIN_INPUT_NUMBER || value > MAX_INPUT_NUMBER
    }

}