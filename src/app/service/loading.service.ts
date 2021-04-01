import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  public startLoading(): void {
    this.loading$.next(true);
  }

  public endLoading(): void {
    this.loading$.next(false);
  }

  public isLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }
}
