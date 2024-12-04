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
    /*
    Load categories from JSON file and subscribe to its changes.
    This allows us to update the categories list in real-time if the JSON file is updated.
    Note: This method assumes that the JSON file contains an array of category objects.
    */
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

  /*
  This method is called whenever the component's input properties change.
  If the editCategory input property is provided, it sets the newCategory object to the same value as the editCategory object.
  This allows the component to display the existing category data when editing an existing category.
  */
  ngOnChanges(changes: SimpleChanges): void {
    
    if (this.editCategory) {
      this.isEdit = true;
      this.newCategory = { ...this.editCategory };
    }

  }

  /*
  This method is called when the user cloases the create category component
  */
  closeCategory() {
    this.categoryClosed.emit(false);
  }
  /*
  This method checks if the form is valid before allowing the user to create or edit a category.
  If the form is valid, it creates a new category object with the provided title, subtitle, and description.
  */
  isFormValid(): boolean {
    const { title, subtitle, description } = this.newCategory;
    return !!title?.trim() && !!subtitle?.trim() && !!description?.trim() && !this.categories.some(category => category.title === title);
  }

  /*
  This method creates a new category or updates an existing category
  */
  createCategory() {
    if (this.newCategory.title && this.newCategory.subtitle && this.newCategory.description) {
      this.newCategory.title = this.newCategory.title.trim();
      this.newCategory.subtitle = this.newCategory.subtitle.trim();
      this.newCategory.description = this.newCategory.description.trim();
      this.newCategory.id = String(Math.max(...this.categories.map(c => Number(c.id) || 0), 0) + 1);
      this.categoryCreated.emit(this.newCategory);
    }
  }

/*
  This method updates the newCategory object with the values from the editCategory input property
 */
  editACategory() {
    this.editCategory = this.newCategory;
    this.categoryEdited.emit(this.editCategory);
  }


}
