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
  constructor() {

  }

  ngOnInit() {
    this.updateMessage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDelete'] || changes['isEdit'] || changes['title']) {
      this.updateMessage();
    }
  }
  updateMessage() {
    if (this.isDelete) {
      this.message = `Είστε σίγουροι/ες πως επιθυμείτε να διαγράψετε τη κατηγορία ${this.title}?`;
    } else if (this.isEdit) {
      this.message = `Οι πληροφορίες της κατηγορίας ${this.title} ενημερώθηκαν επιτυχώς.`;
    } else {
      this.message = `Η κατηγορία ${this.title} δημιουργήθηκε και αποθηκεύτηκε επιτυχώς.`;
    }
  }
  closeAlert() {
    this.isEdit = false;
    this.isDelete = false;
    this.alertClose.emit(false);
  }

  deleteCategory() {
    this.deleteClose.emit(true);
  }

}
