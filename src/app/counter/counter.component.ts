import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ObservableService } from '../service/observable.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  public counter: Observable<number>;

  constructor(private observableService: ObservableService) { }

  ngOnInit(): void {
    this.counter = this.observableService.getCounter();
    const subscription: Subscription = this.counter.subscribe(
      (value: number) => {
        console.log(value);
        // if (value === 5) {
        //   subscription.unsubscribe();
        // }
      },
      (error: any) => console.log(error),
      () => console.log('COMPLETE'),
    );

    // const subscription2: Subscription = counter.subscribe(
    //   (value: number) => console.log(value),
    //   (error: any) => console.log(error),
    //   () => console.log('COMPLETE'),
    // );
  }
}
