import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MailInfo, User, UserInfo } from '../../model/user.model';
import { mergeMap, tap } from 'rxjs/operators';
import { forkJoin, Observable, Observer, of, Subscription } from 'rxjs';
import { ObservableService } from '../../service/observable.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.scss' ],
})
export class UserComponent implements OnInit {

  public errors: Array<any> = [];

  public user: User | undefined;
  public userInfo: UserInfo | undefined;
  public mailInfo: MailInfo | undefined;

  constructor(private userService: UserService) {
  }

  public ngOnInit(): void {
  }

  public start(): void {
    // this.fetchDataForkJoinTyped();
    // this.fetchDataForkJoin();
    // this.fetchData();
    this.fetchDataMergeMap();
  }

  // CALLS
  private fetchDependingData(): void {
    const userSub: Subscription = this.userService.getUser().subscribe(
      (user: User) => {
        this.user = user;
        this.userService.getUserInfo(user.id).subscribe(
          (userInformation: UserInfo) => {
            this.userInfo = userInformation;
            this.userService.getMailInfo(userInformation.mail).subscribe(
              (mailInfo: MailInfo) => this.mailInfo = mailInfo,
              error => console.log(error),
              () => console.log('COMPLETE MAIL INFO'),
            );
          },
          error => console.log(error),
          () => console.log('COMPLETE USER INFORMATION'),
        );
      },
      error => console.log(error),
      () => console.log('COMPLETE USER'),
    );
  }
  private fetchDataMergeMap(): void {
    this.getUser().pipe(
      mergeMap((user: User) => this.getUserInfo(user.id)),
      mergeMap((userInformation: UserInfo) => this.getMailInfo(userInformation.mail)),
    ).subscribe(this.loggerObserver());
  }
  private fetchDataForkJoin(): void {
    forkJoin([
      this.userService.getUser(),
      this.userService.getUserInfo(0),
      this.userService.getMailInfo(''),
    ]).pipe(
      tap((values: Array<any>) => {
        // Order as Input
        this.user = values[0];
        this.userInfo = values[1];
        this.mailInfo = values[2];
      }),
    ).subscribe(this.loggerObserver());
  }
  private fetchDataForkJoinTyped(): void {
    forkJoin([
      this.getUser(),
      this.getUserInfo(0),
      this.getMailInfo('mail'),
    ]).subscribe(this.loggerObserver());
  }

  // OBSERVABLES
  private getUser(): Observable<User> {
    return this.userService.getUser().pipe(
      tap(console.log),
      tap((user: User) => this.user = user),
      // catchError((error: any) => this.getUserInfoError(error)),
    );
  }
  private getUserInfo(id: number): Observable<UserInfo> {
    return this.userService.getUserInfo(id).pipe(
      tap(console.log),
      tap((userInfo: UserInfo) => this.userInfo = userInfo),
    );
  }
  private getMailInfo(mail: string): Observable<MailInfo> {
    return this.userService.getMailInfo(mail).pipe(
      tap(console.log),
      tap((mailInfo: MailInfo) => this.mailInfo = mailInfo),
    );
  }

  // TEST
  private getUserInfoError(error: any): Observable<any> {
    this.errors.push(error);
    return of(null);
  }
  private testObsAndSubs(): void {

    const observable: Observable<any> = new Observable<any>();
    const subscription: Subscription = observable.subscribe();
    subscription.unsubscribe();

    let subs;
    const observable2: Observable<any> = new Observable<any>(subscriber => {
      subs = subscriber;
      subscriber.next('Hello');
      subscriber.next('World');
      subscriber.error('ERROR');
      subscriber.complete();
    });
    const subscription2: Subscription = observable.subscribe(
      console.log,
      console.log,
      console.log,
    );
    subscription2.unsubscribe();
  }
  private loggerObserver(): Observer<any> {
    return ObservableService.loggerObserver();
  }
}
