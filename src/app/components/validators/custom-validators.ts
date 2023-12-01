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




import { AsyncValidatorFn } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';


export const asyncImageValidator: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const file = control.value as File;

    if (!file) {
        return of(null);
    }

    const maxFileSize = 5 * 1024 * 1024;
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    const allowedExtensions = /\.(jpg|jpeg|png)$/i;

    return timer(500).pipe(
        switchMap(() => {
            if (!file.name || !allowedExtensions.test(file.name.toLowerCase())) {
                return of({ invalidExtension: true });
            } else if (!file.type || !allowedMimeTypes.includes(file.type.toLowerCase())) {
                return of({ invalidImage: true });
            } else if (file.size > maxFileSize) {
                return of({ invalidSize: true });
            } else {
                return of(null); // No error if everything is fine
            }
        })
    );
};












