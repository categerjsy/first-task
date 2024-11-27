import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../components/category/category.component';
import { IonicModule } from '@ionic/angular';
import { CategorySearchComponent } from '../components/category-search/category-search.component';
import { CreateCategoryComponent } from '../components/create-category/create-category.component';
import { FormsModule } from '@angular/forms';
import { CustomAlertComponent } from '../components/custom-alert/custom-alert.component';


@NgModule({
  declarations: [CategoryComponent, CategorySearchComponent, CreateCategoryComponent, CustomAlertComponent],
  exports: [CategoryComponent, CategorySearchComponent, CreateCategoryComponent, CustomAlertComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class SharedModule { }
