import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../components/category/category.component';
import { IonicModule } from '@ionic/angular';
import { CategorySearchComponent } from '../components/category-search/category-search.component';
import { CreateCategoryComponent } from '../components/create-category/create-category.component';


@NgModule({
  declarations: [CategoryComponent, CategorySearchComponent, CreateCategoryComponent],
  exports: [CategoryComponent, CategorySearchComponent, CreateCategoryComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule { }
