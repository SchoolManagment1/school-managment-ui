import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private apiUrl = '';
  private tokenKey = 'auth_token';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/auth/login`, { email, password })
      .pipe(
        tap((response: { token: string; }) => {
          if (response.token) {
            localStorage.setItem(this.tokenKey, response.token);
            this.loggedIn.next(true);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
function tap(arg0: (response: { token: string; }) => void): import("rxjs").OperatorFunction<LoginResponse, LoginResponse> {
  throw new Error('Function not implemented.');
}

