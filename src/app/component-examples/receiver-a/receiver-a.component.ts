import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../service/store.service';
import {tap} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-receiver-a',
  templateUrl: './receiver-a.component.html',
  styleUrls: ['./receiver-a.component.scss']
})
export class ReceiverAComponent implements OnInit {

  public data: any;
  public observable: Observable<any>;

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.observable = this.store.onStoreChanged().pipe(
      tap((data: any) => this.data = data),
      tap((data: any) => console.log(data)),
    );
  }

}
