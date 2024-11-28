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
  alertTitle: String | undefined;
  deleteCategory: Category | undefined;
  filteredCategories: Category[] = [];
  searchTerm: string = '';
  searchIt: boolean = false;

  constructor(private foodCategoryService: FoodCategoryService) {

  }

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

  setCurrentDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    this.currentDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  addCategory() {
    this.createCategory = true;
    this.editCategory = undefined;
  }
  getClose($event: any) {
    this.createCategory = $event;
  }

  getNewCategory($event: Category) {
    this.categories.push($event);
    this.createCategory = false;
    this.openAlert = true;
    this.alertTitle = this.categories[this.categories.length - 1].title;
  }

  getCloseAlert($event: any) {
    this.openAlert = false;
  }
  editACategory($event: any) {
    console.log('edit category:', $event);
    this.editCategory = $event;
    this.createCategory = true;
  }

  updateCategory($event: any) {
    const index = this.categories.findIndex((cat) => cat.id === $event.id);

    this.categories[index] = $event;
    console.log('Category updated:', this.categories[index]);


    this.createCategory = false;
    this.editCategory = undefined;
    this.openAlert = true;
    this.alertTitle = this.categories[index].title;
  }

  getDelete($event: any) {
    this.isDelete = true;
    this.openAlert = true;
    this.deleteCategory = $event;
    this.alertTitle = this.deleteCategory?.title;
    console.log('delete category:', $event);
  }

  deleteOK($event: any) {
    this.openAlert = false;
    const index = this.categories.findIndex((cat) => cat.id === this.deleteCategory?.id);
    this.categories.splice(index, 1);
    this.isDelete = false;
  }

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
