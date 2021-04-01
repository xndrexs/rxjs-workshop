import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObservableService } from '../service/observable.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: [ './intro.component.scss' ],
})
export class IntroComponent implements OnInit, OnDestroy {

  public observable: Observable<any>;
  public value: any;

  private unsubscribe: Subject<any> = new Subject<any>();
  private observable2: Observable<any>;

  constructor(private observableService: ObservableService) {
    this.observable = this.observableService.getRange();
  }

  ngOnInit(): void {
    const observable: Observable<number> = new Observable<number>();

    observable.pipe(
      takeUntil(this.unsubscribe),
      debounceTime(200),
      distinctUntilChanged(),
      filter((value: any) => value > 10),
      map((value: number) => value * 2),
      tap((value: any) => this.value = value),
    );

    const subscription: Subscription = observable.subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
