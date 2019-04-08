import {FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Subscription} from 'rxjs';

export namespace CustomValidators {

  export function phoneValidator(c: FormControl): ValidationErrors | null {
    const number = c.value;
    const result: any = {messageKey: ``};
    if (number.pristine) {
      return null;
    }
    const PHONE_REGEXP = /^\+37529-2[0-9]{2}-[0-9]{2}-[0-9]{2}$/;
    if (PHONE_REGEXP.test(number)) {
      return null;
    } else {
      result.messageKey = 'Неверный формат телефона.';
      return result;
    }
  }

  export function required(c: FormControl): ValidationErrors | null {
    const value = c.value || ``;
    const result: any = {messageKey: ``};
    if (!value.trim()) {
      result.messageKey = `Поле не может быть пустым.`;
      return result;
    }
    return null;
  }

  export function length(max: number = null, min: number = null): ValidatorFn {

    return (c: FormControl): ValidationErrors | null => {
      const value = c.value;
      if (!value) {
        return null;
      }
      if (value && value.length === 0) {
        return null;
      }
      if (min && value.length < min) {
        return {
          messageKey: ` Минимальный размер поля ${min} символов.`
        };
      }
      if (max && value.length > max) {
        return {
          messageKey: ` Максимальный размер поля ${max} символов.`
        };
      }
      return null;
    };
  }

  export function compareValidator(controlNameToCompare: string): ValidatorFn {

    return (c: FormControl): ValidationErrors | null => {
      if (c.value === null || c.value.length === 0) {
        return null;
      }
      const controlToCompare = c.root.get(controlNameToCompare);
      if (controlToCompare) {
        const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
          c.updateValueAndValidity();
          subscription.unsubscribe();
        });
      }
      return controlToCompare && controlToCompare.value !== c.value ?
        { messageKey: `Поле не совподает` } :
        null;
    };
  }
}
