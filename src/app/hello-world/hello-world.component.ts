import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss']
})
export class HelloWorldComponent implements OnInit {

  public title = 'rxjs-workshop';
  public helloWorldObservable: Observable<string>;
  public helloWorldObserver: Observer<string>;
  public helloWorldSubscription: Subscription;

  constructor() {
    this.helloWorldObservable = this.initObservable();
    this.helloWorldObserver = this.initHelloWorldObserver();
    this.helloWorldSubscription = this.initHelloWorldSubscription();
  }

  public ngOnInit(): void {
    // this.helloWorldObservable.subscribe(this.helloWorldObserver);
  }

  private initObservable(): Observable<string> {
    const helloWorldObservable: Observable<string> = new Observable(subscriber => {
      subscriber.next('Hello');
      subscriber.next('World');
      subscriber.next(Math.random().toString());
      subscriber.complete();
    });
    const observable: Observable<any> = new Observable<any>();
    const subscription: Subscription = observable.subscribe();
    subscription.unsubscribe();

    return helloWorldObservable;
  }

  private initHelloWorldObserver(): Observer<string> {
    const observer: Observer<string> = {
      next(value: string): void { console.log(value); },
      error(error: any): void { console.log(error); },
      complete(): void { console.log('COMPLETE'); },
    };

    return observer;
  }

  private initHelloWorldSubscription(): Subscription {
    const subscription: Subscription = this.helloWorldObservable.subscribe(
      (value: string) => console.log(value),
      (error: any) => console.log(error),
      () => console.log('COMPLETE'),
    );

    return subscription;
  }
}
