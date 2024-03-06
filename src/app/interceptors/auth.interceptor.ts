import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Observable, catchError, switchMap, tap } from 'rxjs';
import { IFullUser, ILoginUser } from '../types/auth.types';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const user = this.authService.user();

    if (!token || !role) {
      // this.authService.logout();
      return next.handle(req);
    }

    const authClone = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(authClone);
  }
}
