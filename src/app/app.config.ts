// app.config.ts
import { ApplicationConfig } from '@angular/core';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { authInterceptor } from './auth.interceptor';
 // 👈 Make sure this exists

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor,         // 👈 Register custom interceptor
      ]),
      withInterceptorsFromDi()  // 👈 Allows for DI-based interceptors (if needed later)
    )
  ]
};
