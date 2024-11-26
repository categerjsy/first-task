import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Category from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class FoodCategoryService {
  private categories: Category[] = [];

  constructor(private http: HttpClient) { }

  // Fixed method to load categories from JSON array
  loadCategoriesFromJSON(): Observable<Category[]> {
    return this.http.get<Category[]>('assets/category-items/food_categories.json').pipe(
      // The response is already of type Category[] (an array), so no need for map here
      catchError(error => {
        console.error('Error loading categories', error);
        throw error;  // Optionally return a default value or handle differently
      })
    );
  }
}
