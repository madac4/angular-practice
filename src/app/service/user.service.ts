import { Injectable, signal } from '@angular/core';
import { StatusService } from './status.service';
import { IFullUser } from '../types/auth.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoading = signal<boolean>(false);

  constructor(
    private readonly http: HttpClient,
    private readonly status: StatusService,
    private readonly authService: AuthService
  ) {}

  updateAvatar(image: string, id: number): Observable<IFullUser> {
    this.isLoading.set(true);

    if (!localStorage.getItem('token')) {
      this.status.error('You are not logged in');
      this.authService.logout();
      return new Observable<IFullUser>();
    }

    return this.http.put<IFullUser>(`${API_URL}/users/${id}`, { image: image });
  }

  updateProfile(data: IFullUser, id: number) {
    this.isLoading.set(true);

    if (!localStorage.getItem('token')) {
      this.status.error('You are not logged in');
      this.authService.logout();
      return new Observable<IFullUser>();
    }

    return this.http.put<IFullUser>(`${API_URL}/users/${id}`, data);
  }

  getUsers(limit: number = 10, skip?: number): Observable<{ users: IFullUser[] }> {
    this.isLoading.set(true);

    if (!localStorage.getItem('token')) {
      this.status.error('You are not logged in');
      this.authService.logout();
      return new Observable<{ users: IFullUser[] }>();
    }

    return this.http.get<{ users: IFullUser[] }>(`${API_URL}/users?limit=${limit}&skip=${skip ? skip : 0}`);
  }

  deleteUser(id: number): Observable<IFullUser> {
    this.isLoading.set(true);

    if (!localStorage.getItem('token')) {
      this.status.error('You are not logged in');
      this.authService.logout();
      return new Observable<IFullUser>();
    }

    return this.http.delete<IFullUser>(`${API_URL}/users/${id}`);
  }
}
