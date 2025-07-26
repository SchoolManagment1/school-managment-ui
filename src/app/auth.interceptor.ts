import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // Skip adding token to public URLs
  const isPublic = ['/api/auth/login', '/api/auth/register'].some(url => req.url.includes(url));

  const authReq = (!isPublic && token)
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        console.warn('Unauthorized or forbidden. Redirecting to login...');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
