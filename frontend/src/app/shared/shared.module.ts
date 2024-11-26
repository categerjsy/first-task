import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../components/category/category.component';
import { IonicModule } from '@ionic/angular';
import { CategorySearchComponent } from '../components/category-search/category-search.component';


@NgModule({
  declarations: [CategoryComponent, CategorySearchComponent],
  exports: [CategoryComponent, CategorySearchComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule { }
