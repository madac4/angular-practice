import { Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private readonly toast: HotToastService) {}

  error(message: string) {
    this.toast.error(message);
  }

  success(message: string) {
    this.toast.success(message);
  }

  info(message: string) {
    this.toast.info(message);
  }

  warning(message: string) {
    this.toast.warning(message);
  }

  getError(error: any) {
    const message = error.error.message;
    this.toast.error(message);
    return error;
  }
}
