import { Component, OnInit, inject } from '@angular/core';
import { IProduct } from '../../types/product.types';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { ProductsService } from '../../service/products.service';
import { catchError, finalize, map } from 'rxjs';
import { StatusService } from '../../service/status.service';
import { PricePipe } from '../../pipe/price.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SkeletonComponent, PricePipe],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  protected productService: ProductsService = inject(ProductsService);
  protected error: StatusService = inject(StatusService);
  products: IProduct[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService
      .getProducts(10)
      .pipe(
        map((response: { products: IProduct[] }) => {
          this.products = response.products;
        }),
        catchError((error) => {
          return this.error.getError(error);
        }),

        finalize(() => {
          this.productService.isLoading.set(false);
        })
      )
      .subscribe();
  }
}
