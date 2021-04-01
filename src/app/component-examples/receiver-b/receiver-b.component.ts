import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from '../../service/store.service';
import { User } from '../../model/user.model';
import { takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-receiver-b',
  templateUrl: './receiver-b.component.html',
  styleUrls: [ './receiver-b.component.scss' ],
})
export class ReceiverBComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<any>;

  public userInfo: User;
  public onUserChanged$: Observable<User>;

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.onUserChanged$ = this.onUserChanged();
  }

  public onUserChanged(): Observable<User> {
    return this.storeService.onUserChanged().pipe(
      takeUntil(this.unsubscribe),
      tap((user: User) => this.userInfo = user),
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

}
