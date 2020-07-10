import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Utils} from '../../../../core/utils/utils';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnDestroy {

  @Input() pageCount: number;
  @Input() route: string;

  private subscriptions: Array<Subscription> = [];

  public selectedPage = 1;
  public displayHiddenLeft = false;
  public displayHiddenRight = false;
  public middleSection: Array<number> = [];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const subscription: Subscription = this.activatedRoute.queryParams
      .subscribe(queryParams => {
        this.selectPage(queryParams.page ? Number(queryParams.page) : 1);
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public selectPage(page: number): void {
    this.selectedPage = page;
    const middle = this.getMiddle(page, this.pageCount);
    this.displayHiddenLeft = this.shouldDisplayHiddenLeft(middle);
    this.displayHiddenRight = this.shouldDisplayHiddenRight(middle);
    this.middleSection = middle;
  }

  private getMiddle(page: number, pageCount: number): Array<number> {
    const padding = 1;
    const smallCeiling = Math.max(this.pageCount - 4, 2);
    const largeCeiling = Math.min(5, pageCount - 1);

    let smallest = Math.min(smallCeiling, Math.max(2, page - padding));
    let largest = Math.max(largeCeiling, Math.min(pageCount - 1, page + padding));

    // Display one more page at the beginning
    if (smallest - 2 === 1) {
      smallest--;
    }

    if (largest + 2 === this.pageCount) {
      largest++;
    }

    return Utils.range(smallest, largest);
  }

  private shouldDisplayHiddenLeft(middle: Array<number>): boolean {
    return middle[0] - 2 > 1;
  }

  private shouldDisplayHiddenRight(middle: Array<number>): boolean {
    return middle[middle.length - 1] + 2 < this.pageCount;
  }
}
