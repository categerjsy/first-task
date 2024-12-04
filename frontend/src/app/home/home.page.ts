import { Component, OnInit } from '@angular/core';
import Category from '../models/category';
import { FoodCategoryService } from '../services/food-category.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  categories: Category[] = [];
  currentDateTime: string = '';
  private timer: any;
  createCategory: boolean = false;
  openAlert: boolean = false;
  editCategory: Category | undefined;
  isDelete: boolean = false;
  isEdit: boolean = false;
  alertTitle: String | undefined;
  deleteCategory: Category | undefined;
  filteredCategories: Category[] = [];
  searchTerm: string = '';
  searchIt: boolean = false;
  deleteCategoryIndex: number | null = null;

  constructor(private foodCategoryService: FoodCategoryService) {

  }

  ngOnInit() {
    // Load categories from JSON file

    this.foodCategoryService.loadCategoriesFromJSON().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categories loaded:', this.categories);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });

    this.setCurrentDateTime();

    //change date-time in every second
    this.timer = setInterval(() => {
      this.setCurrentDateTime();
    }, 1000);

    // Mock data

  }

  ngOnDestroy() {
    //cleaning the component avoiding memory leaks
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  /*
This method sets the current date-time in every second
  */
  setCurrentDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    this.currentDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  /*
  This displays the create-category component
   */
  addCategory() {
    this.createCategory = true;
    this.isEdit = false;
    this.editCategory = undefined;
  }
  /*
  This method handles the closing of the create-category component and updates the alert accordingly
  */
  getClose($event: any) {
    this.createCategory = $event;
  }
  /*
  This method handles the closing of the alert and updates the categories accordingly
  */
  getNewCategory($event: Category) {
    this.categories.push($event);
    this.createCategory = false;
    this.openAlert = true;
    this.alertTitle = this.categories[this.categories.length - 1].title;
  }

  /*
  This method handles the closing of the delete-category component and updates the alert accordingly
  */
  getCloseAlert($event: any) {
    this.openAlert = false;
  }
  /*
  This method handles the opening of the edit a category
   */
  editACategory($event: any) {
    this.isEdit = true;
    console.log(this.isEdit);
    console.log('edit category:', $event);
    this.editCategory = $event;
    this.createCategory = true;
  }

  /*
    This method updates the category list
     */
  updateCategory($event: any) {
    const index = this.categories.findIndex((cat) => cat.id === $event.id);
    this.categories[index] = $event;
    this.createCategory = false;
    this.editCategory = undefined;
    this.openAlert = true;
    this.alertTitle = this.categories[index].title;
  }

  /*
  This method handles the closing of the delete-category component and updates the alert accordingly
  */
  getDelete($event: any, index: number) {
    this.isDelete = true;
    this.openAlert = true;
    this.deleteCategory = $event;
    this.alertTitle = this.deleteCategory?.title;
    this.deleteCategoryIndex = index;
  }


  /*
  This method updates the list of categories after deleting
  */

  deleteOK($event: any) {
    this.openAlert = false;
    if (this.deleteCategoryIndex !== null) {
      this.categories.splice(this.deleteCategoryIndex, 1);
    }
    //updating filtered categories
    if (this.searchIt) {
      this.filteredCategories = this.categories.filter((category) =>
        category.title?.toLowerCase().includes(this.searchTerm.toLowerCase().trim()) ||
        category.subtitle?.toLowerCase().includes(this.searchTerm.toLowerCase().trim())
      );
    }
    this.isDelete = false;
  }

  /*
    This method handles the search
   */
  getSearch($event: string) {
    this.searchTerm = $event;
    console.log('search term:', $event);
    if (this.searchTerm == '') {
      this.searchIt = false;
    }
    else {
      this.searchIt = true;
    }
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredCategories = [...this.categories];
    } else {
      this.filteredCategories = this.categories.filter(
        (category) =>
          category.title?.toLowerCase().includes(term) ||
          category.subtitle?.toLowerCase().includes(term)
      );
    }
  }
}
