export interface User {
  id: number;
  name: string;
}

export interface UserInfo {
  user: User;
  mail: string;
  phone: string;
}

export interface MailInfo {
  domain: string;
}

export abstract class Data {
  public static readonly USER: User =  {
    id: 0,
    name: 'Torvi',
  };
  public static readonly USER_INFORMATION: UserInfo = {
    user: Data.USER,
    mail: 'mail',
    phone: 'phone',
  };
  public static readonly MAIL_INFO: MailInfo = {
    domain: 'detim.de',
  };
}

export enum ApiUrl {
  USER = 'user',
  USER_INFORMATION = 'userInformation',
  MAIL_INFO = 'mailInfo',
}
