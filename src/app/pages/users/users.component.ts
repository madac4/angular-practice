import { TableComponent } from '../../components/table/table.component';
import { StatusService } from '../../service/status.service';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { IFullUser } from '../../types/auth.types';
import { LucideAngularModule } from 'lucide-angular';
import { SearchPipe } from '../../pipe/search.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableComponent, LucideAngularModule, SearchPipe, CommonModule],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  private readonly statusService: StatusService = inject(StatusService);
  protected userService: UserService = inject(UserService);
  protected authService: AuthService = inject(AuthService);
  tableColumns: string[];
  tableData: IFullUser[];
  searchQuery: string;
  pagination: {
    limit: number;
    skip: number;
    totalPages: number[];
  } = {
    limit: 10,
    skip: 0,
    totalPages: [],
  };

  constructor() {
    this.tableColumns = ['ID', 'Numele, Prenumele', 'Email', 'Nr. Telefon', 'Adresa', 'Vârsta', 'Sexul', 'Username'];
    this.tableData = [];
    this.searchQuery = '';
  }

  ngOnInit(): void {
    this.getUsers();
  }

  setInitialPagination(totalPages: number): void {
    const pages = Math.ceil(totalPages / this.pagination.limit);

    this.pagination.totalPages = Array.from({ length: pages }, (v, i) => i + 1);
  }

  getUsers(limit: number = 0, skip: number = 0): void {
    this.userService
      .getUsers(limit, skip)
      .pipe(
        switchMap((response: { users: IFullUser[] }) => {
          if (limit === 0 && skip === 0) {
            this.setInitialPagination(response.users.length);
            const initialItems = response.users.slice(0, this.pagination.limit);
            return (this.tableData = initialItems);
          }
          return (this.tableData = response.users);
        }),
        catchError((error) => {
          return this.statusService.getError(error);
        }),
        finalize(() => {
          this.userService.isLoading.set(false);
        })
      )
      .subscribe();
  }

  removeUser(id: number): void {
    this.userService
      .deleteUser(id)
      .pipe(
        switchMap((response: IFullUser) => {
          return (this.tableData = this.tableData.filter((user: IFullUser) => user.id !== id));
        }),
        finalize(() => {
          this.userService.isLoading.set(false);
        })
      )
      .subscribe();
  }

  searchUser(searchQuery: Event): void {
    this.searchQuery = (searchQuery.target as HTMLInputElement).value;
  }

  handlePagination(where?: string, page?: number): void {
    if (where === 'next') {
      this.getUsers(this.pagination.limit, this.pagination.skip + this.pagination.limit);
      this.pagination.skip += this.pagination.limit;
    } else if (where === 'prev') {
      this.getUsers(this.pagination.limit, this.pagination.skip - this.pagination.limit);
      this.pagination.skip -= this.pagination.limit;
    }

    if (page) {
      this.getUsers(this.pagination.limit, page * 10 - 10);
      this.pagination.skip = page * 10 - 10;
    }

    if (this.pagination.skip < 0) {
      this.pagination.skip = 0;
    }
  }
}
