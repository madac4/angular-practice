import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { StatusService } from '../../service/status.service';
import { IProduct } from '../../types/product.types';
import { catchError, finalize, map } from 'rxjs';
import { PricePipe } from '../../pipe/price.pipe';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [PricePipe],
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  protected productService: ProductsService = inject(ProductsService);
  protected error: StatusService = inject(StatusService);
  products: IProduct[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService
      .getProducts(40)
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
