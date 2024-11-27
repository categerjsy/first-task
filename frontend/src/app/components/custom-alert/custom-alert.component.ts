import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss'],
})
export class CustomAlertComponent  implements OnInit {
  @Output() alertClose = new EventEmitter();
  constructor() { }

  ngOnInit() { }
  
  closeAlert() {
    this.alertClose.emit(false);
  }

}
