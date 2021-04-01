import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiUrl, Data, MailInfo, User, UserInfo } from '../model/user.model';
import { delay, map, tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private server: { [url in ApiUrl]: any } = {
    user: Data.USER,
    userInformation: Data.USER_INFORMATION,
    mailInfo: Data.MAIL_INFO,
  };

  constructor(private loadingService: LoadingService) {
  }

  public getUser(): Observable<User> {
    return this.get(ApiUrl.USER).pipe(
      tap((value: any) => console.log(value)),
    );
  }

  public getUserInfo(id: number): Observable<UserInfo> {
    return this.get(ApiUrl.USER_INFORMATION, id);
  }

  public getMailInfo(mail: string): Observable<MailInfo> {
    return this.get(ApiUrl.MAIL_INFO, mail);
  }

  private get(url: ApiUrl, ...params: any): Observable<any> {
    return of(this.server[url]).pipe(
      delay(2500),
    );
  }
}
