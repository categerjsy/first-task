import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  closeCategory() {
    this.categoryClosed.emit(false);
  }

  isFormValid(): boolean {
    const { title, subtitle, description } = this.newCategory;
    return !!title && !!subtitle && !!description && !this.categories.some(category => category.title === title);
  }

  createCategory() {
    if (this.newCategory.title && this.newCategory.subtitle && this.newCategory.description) {
      this.newCategory.id = String(Math.max(...this.categories.map(c => Number(c.id) || 0), 0) + 1);
      this.categoryCreated.emit(this.newCategory);
    }
  }



}
