import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableService } from '../service/observable.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() public observable: Observable<any>;

  constructor() { }

  ngOnInit(): void {
  }

  public start(): void {
    if (this.observable != null) {
      this.observable.subscribe(ObservableService.loggerObserver());
    }
  }
}
