import { AbstractControl} from '@angular/forms';

const MAX_INPUT_NUMBER = 22;
const MIN_INPUT_NUMBER = 1;
const TARGET_REGEX = /^[\d]*$/;

export function targetFieldValidator(control: AbstractControl): {[key: string]: any} | null  {
    if (!TARGET_REGEX.test(control.value)) {
        return {'invalidFormat': {valid: false}};
    }
    if (control.value.length === 0) {
        return null;
    }
    if (isInvalidRange(parseInt(control.value))) {
        return {'invalidRange': {valid: false}};
    }
    return null;
}

function isInvalidRange(value) {
    return isNaN(value) || value < MIN_INPUT_NUMBER || value > MAX_INPUT_NUMBER
}