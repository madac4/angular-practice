import { ApplicationConfig, NgModule, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { LucideAngularModule, Loader2, Eye, EyeOff, LogOut, Heart, Pencil, UserPlus, Trash } from 'lucide-angular';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHotToastConfig(),
    provideHttpClient(),
    importProvidersFrom(
      LucideAngularModule.pick({ Loader2, Eye, EyeOff, LogOut, Heart, Pencil, UserPlus, Trash }),
      HttpClientModule,
      NgModule
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideRouter(routes),
  ],
};
