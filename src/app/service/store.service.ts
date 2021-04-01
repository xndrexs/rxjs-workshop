import { Injectable } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { User } from '../model/user.model';
import { StoreItem, StoreKey } from '../model/store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  private store: { [key in StoreKey]: StoreItem<any> };
  private onStoreChanged$: Observable<any>;

  constructor() {
    this.store = {
      [StoreKey.User]: this.initStoreItem<User>(StoreKey.User, null),
      [StoreKey.MailInfo]: this.initStoreItem(StoreKey.MailInfo, null),
      [StoreKey.UserInformation]: this.initStoreItem(StoreKey.UserInformation, null),
    };

    const observables: Array<Observable<any>> = Object.values(this.store)
      .map((storeItem: StoreItem<any>) => storeItem.subject.asObservable());
    this.onStoreChanged$ = merge(observables);
  }

  public setUser(user: User): void {
    this.store.user.value = user;
    this.store.user.subject.next(user);
  }

  public onUserChanged(): Observable<User> {
    const userStoreItem: StoreItem<User> = this.store.user;
    return userStoreItem.subject.asObservable();
  }

  public setData<T>(key: StoreKey, value: T): void {
    this.store[key].value = value;
    this.store[key].subject.next(value);
  }

  public onDataChanged<T>(key: StoreKey): Observable<T> {
    const storeItem: StoreItem<T> = this.store[key];
    return storeItem.subject.asObservable();
  }

  public onStoreChanged(): Observable<any> {
    return this.onStoreChanged$;
  }

  private initStoreItem<T>(key: StoreKey, value: T): StoreItem<T> {
    return { key: key, value: value, oldValue: value, subject: new Subject<T>() };
  }
}
