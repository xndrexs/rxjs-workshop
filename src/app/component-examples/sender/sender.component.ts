import { Component, OnInit } from '@angular/core';
import {Data} from '../../model/user.model';
import { StoreKey } from '../../model/store.model';
import { StoreService } from '../../service/store.service';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss']
})
export class SenderComponent implements OnInit {

  constructor(private store: StoreService) { }

  ngOnInit(): void {
  }

  public sendData(): void {
    this.store.setUser(Data.USER);
  }

  public sendMailInfo(): void {
    this.store.setData(StoreKey.MailInfo, Data.MAIL_INFO);
  }

  public sendUserInformation(): void {
    this.store.setData(StoreKey.UserInformation, Data.USER_INFORMATION);
  }
}
