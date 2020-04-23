import {Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit, OnDestroy {

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private subscriptions: Array<Subscription> = [];
  private order: Array<string> = [];

  tags = ['Popular', 'Under 500', 'With light', 'Under the bridge', 'Digital'];
  public tagsFormGroup: FormGroup;
  public _result = '';
  public focused = false;

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    this.focused = this.eRef.nativeElement.contains(event.target);
  }

  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
    this.tagsFormGroup = new FormGroup(this.getTagFormControls(this.tags));

    this.subscriptions.push(this.tagsFormGroup.valueChanges
      .subscribe(value => {
        const res = this.toResult(value, this.order);
        this.order = res.order;
        this._result = res.result;
        this.result.emit(this._result);
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public clear() {
    this.order.forEach(tag => this.tagsFormGroup.controls[tag].patchValue(false));
    this.focused = false;
  }

  private getTagFormControls(tags: Array<string>): { [key: string]: AbstractControl } {
    return tags.reduce((formControls, tag) => ({...formControls, [tag]: new FormControl(false)}), {});
  }

  private toResult(values: { [key: string]: boolean }, order: Array<string>): {order, result} {
    const isSelected = key => !!values[key];
    const sortOrder = key => order.includes(key) ? order.indexOf(key) : order.length;
    const sortFn = (a: string, b: string) => sortOrder(a) - sortOrder(b);

    const newOrder = Array.from(Object.keys(values))
      .filter(isSelected)
      .sort(sortFn);

    const result = newOrder.length === 0 ? '' : newOrder
      .reduce((str, key) => `${str}, ${key}`);

    return {order: newOrder, result};
  }
}
