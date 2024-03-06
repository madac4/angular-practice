import { Pipe, PipeTransform, inject } from '@angular/core';
import { IFullUser } from '../types/auth.types';
import { StatusService } from '../service/status.service';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  private readonly status: StatusService = inject(StatusService);

  transform(items: IFullUser[], searchQuery: string): IFullUser[] {
    if (!items) {
      return [];
    }

    if (!searchQuery) {
      return items;
    }

    searchQuery = searchQuery.toLowerCase();

    return items.filter((item: IFullUser) => {
      return item.username.toLowerCase().includes(searchQuery);
    });
  }
}
