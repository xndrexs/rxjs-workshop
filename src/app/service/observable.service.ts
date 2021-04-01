import { Injectable } from '@angular/core';
import { from, interval, Observable, Observer, of, throwError } from 'rxjs';
import { concatMap, delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  constructor() {
    this.counter = this.initCounter();
    this.range = this.initRange();
  }

  private readonly counter: Observable<number>;
  private readonly range: Observable<number>;

  public static loggerObserver(name: string = ''): Observer<any> {
    const prefix = name ? name + ' - ' : '';
    const observer: Observer<any> = {
      next(value: any): void { console.log(prefix + 'NEXT: ', value); },
      error(error: any): void { console.log(prefix + 'ERROR: ', error); },
      complete(): void { console.log(prefix + 'COMPLETE'); },
    };

    // with arrow function
    const observer2: Observer<any> = {
      next: x => console.log(x),
      error: x => console.log(x),
      complete: () => console.log('OK'),
    };

    return observer;
  }

  public getRange(): Observable<number> {
    return this.range;
  }

  public getCounter(): Observable<number> {
    return this.counter;
  }

  private initRange(): Observable<any> {
    return from([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]).pipe(
      concatMap(x => of(x).pipe(delay(1000))),
    );
  }

  private initCounter(): Observable<number> {
    return interval(1000).pipe(
      map((value: number) => {
        if (value === 5) {
          throw new Error(`Value is ${value}`);
        } else {
          return value;
        }
      })
    );
  }
}
