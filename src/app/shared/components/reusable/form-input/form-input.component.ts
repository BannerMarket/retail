import {
  Component,
  ElementRef, EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output, TemplateRef, ViewChild
} from '@angular/core';
import {ControlContainer, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CustomControlBaseComponent} from '../../../models/custom-control-base.component';
import {Subscription} from 'rxjs';

type SupportedTypes = 'text' | 'email' | 'password' | 'number' | 'select';

const arrayIncludes = <T>(arr: T[]) => (value: T): boolean => arr.indexOf(value) !== -1;

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true
    }
  ]
})
export class FormInputComponent extends CustomControlBaseComponent<string> implements OnInit, OnDestroy {
  private static SUPPORTED_TYPES = ['text', 'email', 'password', 'number', 'select'];
  private static isSupportedType = arrayIncludes(FormInputComponent.SUPPORTED_TYPES);

  @Input() placeholder = '';
  @Input() label = '';
  @Input() type: SupportedTypes = 'text';
  @Input() ngModelOptions = {};
  @Input() withSuggestions = false;
  @Input() set value(value) { this.writeValue(value); }
  @Input() readonly = false;
  @Input() highlighted = false;

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
    if (!FormInputComponent.isSupportedType(this.type)) {
      throw Error(`form-input doesn't support type "${this.type}". Supported types are: ${FormInputComponent.SUPPORTED_TYPES}`);
    }

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
    if (typeof value === 'string') {
      this.ngModel = value;
    } else {
      this.ngModel = '';
    }
  }

  clearInput($event) {
    $event.stopPropagation();
    this.writeValue('');
    this.clear.emit($event);
  }
}
