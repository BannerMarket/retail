import {Input} from '@angular/core';
import {ControlContainer, ControlValueAccessor} from '@angular/forms';

type OnChangeFn<T> = (value: T) => void;
type OnTouchedFn = () => void;

function noop() {
}

export abstract class CustomControlBaseComponent<T> implements ControlValueAccessor {

  @Input() formControlName: string;

  public onChange: OnChangeFn<T> = noop;
  public onTouched: OnTouchedFn = noop;
  public disabled = false;

  public get formControl() {
    if (this._parent && this.formControlName) {
      return this._parent.control.get(this.formControlName);
    } else {
      return undefined;
    }
  }

  // tslint:disable-next-line:variable-name
  protected constructor(private _parent?: ControlContainer) {
  }

  registerOnChange(fn: OnChangeFn<T>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedFn): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  abstract writeValue(obj: any): void;

}
