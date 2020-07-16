import {Component, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Optional, Output, ViewChild} from '@angular/core';
import {ControlContainer, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CustomControlBaseComponent} from '../../../models/custom-control-base.component';
import {Subscription} from 'rxjs';
import {SelectionOption} from '../modal/selection-option.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent extends CustomControlBaseComponent<string> implements OnInit, OnDestroy {

  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() ngModelOptions = {};
  @Input() withSuggestions = false;
  @Input() set value(value) { this.writeValue(value); }
  @Input() readonly = false;
  @Input() highlighted = false;
  @Input() options: Array<SelectionOption> = [];

  @Output() input: EventEmitter<Event> = new EventEmitter();
  @Output() keyup: EventEmitter<Event> = new EventEmitter();
  @Output() click: EventEmitter<Event> = new EventEmitter();
  @Output() focus: EventEmitter<Event> = new EventEmitter();
  @Output() blur: EventEmitter<Event> = new EventEmitter();
  @Output() clear: EventEmitter<Event> = new EventEmitter();
  @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement>;

  public innerType = '';
  public innerModel = '';
  public isEmpty = true;
  public focused = false;

  private subscriptions: Array<Subscription> = [];

  public get ngModel() {
    return this.innerModel;
  }

  public set ngModel(newValue: string) {
    this.innerModel = newValue;
    this.isEmpty = newValue.length === 0;

    this.onChange(newValue);
  }

  constructor(@Optional() private parent: ControlContainer) {
    super(parent);
  }

  ngOnInit() {
    this.innerType = this.type;
    this.subscriptions
      .push(this.click.subscribe(() => this.onTouched()));
    this.subscriptions
      .push(this.focus.subscribe(() => this.focused = true));
    this.subscriptions
      .push(this.blur.subscribe(() => this.focused = false));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  writeValue(value: any) {
    if (typeof value === 'string' || typeof value === 'number') {
      this.ngModel = '' + value;
    } else {
      this.ngModel = '';
    }
  }

  get getShowError() {
    if (this.formControl) {
      return this.formControl.dirty && this.formControl.errors;
    } else {
      return false;
    }
  }

  public toOptionName(value: string): string | number {
    const option = this.options.find(_option => _option.value === value);
    return option ? option.name : '';
  }
}
