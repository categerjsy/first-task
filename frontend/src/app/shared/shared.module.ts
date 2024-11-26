import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../components/category/category.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [CategoryComponent],
  exports: [CategoryComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule { }
