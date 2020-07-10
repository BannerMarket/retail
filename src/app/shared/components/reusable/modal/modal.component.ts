import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public isVisible = false;

  @Input() contentRef: TemplateRef<any>;
  @Input() title = '';
  @Output() onClose: EventEmitter<Event> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public open(): void {
    this.isVisible = true;
    document.getElementsByTagName('BODY')[0]['style'].overflow = 'hidden';
  }

  public close($event: Event): void {
    this.isVisible = false;
    document.getElementsByTagName('BODY')[0]['style'].overflow = 'unset';
    this.onClose.emit($event);
  }

}
