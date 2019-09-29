import { AbstractControl, FormArray } from '@angular/forms';

export function uniqueFieldValueValidator(formArray: FormArray) {
    return (control: AbstractControl): {[key: string]: any} | null => {    
        for (const controllName in formArray.controls) {
            const checkControl = formArray.controls[controllName];
            if (checkControl === control) {
                continue;
            }
            if (checkControl.value === control.value) {
                return {'nonUniqueValue': {valid: false}};
            }
        }
        return null;
    }
}