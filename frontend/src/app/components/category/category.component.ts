import { Component, EventEmitter, Input, Output } from '@angular/core';
import Category from 'src/app/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() category: Category | undefined;
  @Output() editCategoryEdit = new EventEmitter<Category>();
  @Output() deleteCategory = new EventEmitter<Category>();
  constructor() { }

  edit() {
    this.editCategoryEdit.emit(this.category);
    console.log(this.category);
  }

  delete() {
    this.deleteCategory.emit(this.category);
    console.log(this.category);
  }

}
