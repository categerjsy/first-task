import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss'],
})
export class CustomAlertComponent implements OnInit {
  @Output() alertClose = new EventEmitter();
  @Input() title: String | undefined;
  message: String = ""
  @Input() isDelete: boolean = false;
  @Input() isEdit: boolean = false;

  @Output() deleteClose = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.message = `Η κατηγορία ${this.title} δημιουργήθηκε και αποθηκεύτηκε επιτυχώς`
    if (this.isDelete) {
      this.message = `Είστε σίγουροι ες πως επιθυμείτε να διαγράψετε τη κατηγορία ${this.title};`
    }
    if (this.isEdit) {
      this.message = `Οι πληροφορίες της κατηγορίας ${this.title} ενημερώθηκαν επιτυχώς.`
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isEdit) {
      this.message = `Οι πληροφορίες της κατηγορίας ${this.title} ενημερώθηκαν επιτυχώς.`
    }
    else {
      this.message = `Η κατηγορία ${this.title} δημιουργήθηκε και αποθηκεύτηκε επιτυχώς`
    }
  }
  closeAlert() {
    this.alertClose.emit(false);
  }

  deleteCategory() {
    this.deleteClose.emit(true);
  }

}
