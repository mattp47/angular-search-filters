import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { UserService } from '../user.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  public form: FormGroup;

  @Output() autoSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() groupFilters: EventEmitter<any>  = new EventEmitter<any>();

  public searchText: any = '';

  constructor(private fb: FormBuilder,
              private userService: UserService) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.form = this.fb.group({
      name: new FormControl(''),
      prefix: new FormControl(''),
      position: new FormControl(''),
      gender: new FormControl('')
    });
  }

  public search(filters: any): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.groupFilters.emit(filters);
  }

  public reset() {
    this.groupFilters.emit([]);
    this.autoSearch.emit('');
    this.searchText = '';
    this.form.controls['name'].setValue('');
    this.form.controls['prefix'].setValue('');
    this.form.controls['position'].setValue('');
    this.form.controls['gender'].setValue('');
  }
}
