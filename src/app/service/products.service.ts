import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '../constants/config';
import { Observable } from 'rxjs';
import { IProductList } from '../types/product.types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  isLoading = signal<boolean>(false);
  private readonly router: Router = inject(Router);
  private readonly http: HttpClient = inject(HttpClient);

  getProducts(limit: number = 20): Observable<IProductList> {
    this.isLoading.set(true);
    return this.http.get<IProductList>(`${API_URL}/products?limit=${limit}`);
  }
}
