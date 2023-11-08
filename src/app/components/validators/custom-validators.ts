import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class Space {
    static noSpaceAllowed(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0) {
            return { 'noSpaceAllowed': true }
        }
        return null
    }
}

export class WhiteSpace {
    static validate(control: AbstractControl): { [key: string]: any } {
        if (control.value && control.value.trim().length === 0) {
            return { 'whitespace': true };
        }
        return {};
    }
}

export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    return control.value.password === control.value.confirmPassword
        ? null
        : { 'PasswordNoMatch': true };
};
