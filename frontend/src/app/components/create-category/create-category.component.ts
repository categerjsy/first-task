import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import Category from 'src/app/models/category';
import { FoodCategoryService } from '../../services/food-category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {

  @Output() categoryClosed = new EventEmitter<boolean>();
  @Output() categoryCreated = new EventEmitter<Category>();
  newCategory: Category = new Category();
  categories: Category[] = [];
  isEdit = false;
  @Input() editCategory: Category | undefined;
  @Output() categoryEdited = new EventEmitter<Category>();

  constructor(private foodCategoryService: FoodCategoryService) { }

  ngOnInit() {
    this.foodCategoryService.loadCategoriesFromJSON().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categories loaded:', this.categories);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (this.editCategory) {
      this.isEdit = true;
      this.newCategory = { ...this.editCategory };
    }

  }

  closeCategory() {
    this.categoryClosed.emit(false);
  }

  isFormValid(): boolean {
    const { title, subtitle, description } = this.newCategory;
    return !!title?.trim() && !!subtitle?.trim() && !!description?.trim() && !this.categories.some(category => category.title === title);
  }

  createCategory() {
    if (this.newCategory.title && this.newCategory.subtitle && this.newCategory.description) {
      this.newCategory.title = this.newCategory.title.trim();
      this.newCategory.subtitle = this.newCategory.subtitle.trim();
      this.newCategory.description = this.newCategory.description.trim();
      this.newCategory.id = String(Math.max(...this.categories.map(c => Number(c.id) || 0), 0) + 1);
      this.categoryCreated.emit(this.newCategory);
    }
  }

  editACategory() {
    this.editCategory = this.newCategory;
    this.categoryEdited.emit(this.editCategory);
  }


}
