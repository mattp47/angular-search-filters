import { Component, Input, OnChanges, ChangeDetectorRef, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { UserService } from '../user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnChanges, OnInit {

  @Input() groupFilters: Object;
  @Input() searchByKeyword: string;

  public users: any[] = [];
  public filteredUsers: any[] = [];

  constructor(private userService: UserService,
    private ref: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.loadUsers();
  }

  public ngOnChanges(): void {
    if (this.groupFilters) {
      this.filterUserList(this.groupFilters, this.users);
    }
  }

  public filterUserList(filters: any, users: any): void {
    this.filteredUsers = this.users;     // Reset User List

    const keys = Object.keys(filters);
    const filterUser = user => keys.every(key => {
      // Use upper and lowercase
      return String(user[key]).toLowerCase().includes(String(filters[key]).toLowerCase())
    });

    this.filteredUsers = this.users.filter(filterUser);
    console.log('this.filteredUsers' + JSON.stringify(this.filteredUsers));

    // this.ref.detectChanges();
  }

  public loadUsers(): void {
    this.userService.fetchUsers()
      .subscribe(users => this.users = users);

    this.filteredUsers = this.filteredUsers.length > 0 ? this.filteredUsers : this.users;
  }

}
