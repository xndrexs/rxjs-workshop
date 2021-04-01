import { Subject } from 'rxjs';

export interface StoreItem<T> {
  key: string;
  value: T;
  oldValue: T;
  subject: Subject<T>;
}

export enum StoreKey {
  User = 'user',
  MailInfo = 'mailInfo',
  UserInformation = 'UserInformation',
}
