import {Component, forwardRef, Input, OnInit, Optional} from '@angular/core';
import {CustomControlBaseComponent} from '../../../models/custom-control-base.component';
import {ControlContainer, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent extends CustomControlBaseComponent<boolean> implements OnInit {

  @Input() label = '';
  public innerModel = false;

  constructor(@Optional() private parent: ControlContainer) {
    super(parent);
  }

  ngOnInit(): void {}

  public set ngModel(newValue: boolean) {
    this.innerModel = !!newValue;
    this.onChange(!!newValue);
  }

  public get ngModel() {
    return this.innerModel;
  }

  writeValue(value: any): void {
    this.ngModel = !!value;
  }

  toggle() {
    this.writeValue(!this.ngModel);
  }
}
