import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '../constants/config';
import { Observable } from 'rxjs';
import { IFullUser, ILoginUser } from '../types/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoading = signal<boolean>(false);
  loggedIn = signal<boolean>(false);
  isAdmin = signal<boolean>(false);
  user = signal<IFullUser | null>(null);

  constructor(private readonly router: Router, private readonly http: HttpClient) {
    this.loggedIn.set(!!localStorage.getItem('token'));
    this.isAdmin.set(localStorage.getItem('role') === 'admin');
  }

  login(username: string, password: string): Observable<ILoginUser> {
    this.isLoading.set(true);
    return this.http.post<ILoginUser>(`${API_URL}/auth/login`, { username, password });
  }

  logout() {
    this.loggedIn.set(false);
    this.user.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }

  me(): Observable<IFullUser> {
    this.isLoading.set(true);
    return this.http.get<IFullUser>(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
}
