import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.updateMessage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDelete'] || changes['isEdit'] || changes['title']) {
      this.updateMessage();
    }
  }
  /*
  This method updates the message property
   */
  updateMessage() {
    if (this.isDelete) {
      this.translateService.get('alert.message_delete', { categoryName: this.title }).subscribe((res: string) => {
        this.message = res;
      });
      } else if (this.isEdit) {
      this.translateService.get('alert.message_edit', { categoryName: this.title }).subscribe((res: string) => {
        this.message = res;
      });
      } else {
      this.translateService.get('alert.message_default', { categoryName: this.title }).subscribe((res: string) => {
        this.message = res;
      });
      }
    }
    /*
    This method emits a boolean value to close the alert
     */
    closeAlert() {
      this.isEdit = false;
      this.isDelete = false;
      this.alertClose.emit(false);
    }

    /*
    This method emits a boolean value to delete the category
     */
    deleteCategory() {
      this.deleteClose.emit(true);
    }

  }
