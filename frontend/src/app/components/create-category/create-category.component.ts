import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {

  @Output() categoryClosed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

  closeCategory() {
    this.categoryClosed.emit(false);
  }

}
