import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://school-managment-a7daa0789071.herokuapp.com/api/auth';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    debugger;
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
getUserRole(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.role || decoded.roles?.[0] || null;  // Adjust based on backend JWT
  } catch {
    return null;
  }
}
getUserInfo(): any {
  const token = this.getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}
}
