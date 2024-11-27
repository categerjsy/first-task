import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss'],
})
export class CustomAlertComponent implements OnInit {
  @Output() alertClose = new EventEmitter();
  @Input() title: String | undefined;
  @Input() isEdit: boolean = false;
  message: String = ""
  constructor() { }

  ngOnInit() {
    this.message = `Η κατηγορία ${this.title} δημιουργήθηκε και αποθηκεύτηκε επιτυχώς`
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.message = `Οι πληροφορίες της κατηγορίας ${this.title} ενημερώθηκαν επιτυχώς.`
  }


  closeAlert() {
    this.alertClose.emit(false);
  }

}
