import { Injectable, EventEmitter } from "@angular/core";
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class SearchService {
  formControl = new FormControl();
  searchTerm = this.formControl.valueChanges.pipe();
  searchResults = new EventEmitter<any[]>();

  search() {
    let query = `?term=${this.formControl.value}`;
    console.log(query);
  }
}