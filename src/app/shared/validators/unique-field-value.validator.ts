import { Validator, AbstractControl, NG_VALIDATORS, NgForm } from '@angular/forms';
import { Directive, Input } from '@angular/core';

const PREFIX_REGEX = /^[A-Za-z]*/;

@Directive({
    selector: '[uniqueFieldValue]',
    providers: [{provide: NG_VALIDATORS, useExisting: UniqueFieldValueValidator, multi: true}]
})
export class UniqueFieldValueValidator implements Validator {

    @Input('uniqueFieldValue') ngForm: NgForm;

    validate(control: AbstractControl): {[key: string]: any} | null {
        const inputValue = control.value;
        if (!inputValue || !inputValue.length) {
            return null;
        }
        const currentControlName = this.getControlName(control); 
        const currentControlNamePrefix = this.getNamePrefix(currentControlName);
        const allControls = this.getControls();

        for (const controlName in allControls) {
            if (controlName === currentControlName) {
                continue;
            }
            const namePrefix = this.getNamePrefix(controlName);
            if (namePrefix !== currentControlNamePrefix) {
                continue;
            }
            if (allControls[controlName].value === inputValue) {
                return {'nonUniqueValue': {valid: false}};
            }
        }
        return null;
    }

    getNamePrefix(name): string {
        return name.match(PREFIX_REGEX)[0];    
    }

    getControlName(control: AbstractControl): string {
        const controls = this.getControls();
        for (let controlName in controls) {
            if (controls[controlName] === control) {
                return controlName;
            }
        }
    }

    getControls() {
        return this.ngForm.form.controls;
    }

}