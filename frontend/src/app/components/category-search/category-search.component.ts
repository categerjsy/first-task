import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss'],
})
export class CategorySearchComponent implements OnInit {

  @Output() search = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }
  

  onSearchChange(event: any) {
    this.search.emit(event.target.value); 
  }

}
