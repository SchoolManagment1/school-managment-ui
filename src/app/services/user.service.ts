import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user.model';
import { RegisterRequest } from '../models/userRequest.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://school-managment-a7daa0789071.herokuapp.com/api/users';
  private apiUrl1 = 'https://school-managment-a7daa0789071.herokuapp.com/api/auth'; // ✅ Update this with your backend endpoint

  constructor(private http: HttpClient) {}

  // Get all users
  getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(this.apiUrl);
  }

  // Get user by ID
  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`);
  }

  // Create new user
  createUser(user: RegisterRequest): Observable<RegisterRequest> {
    return this.http.post<RegisterRequest>(`${this.apiUrl1}/register`, user);
  }

  // Update existing user
  updateUser(id: number, user: RegisterRequest): Observable<RegisterRequest> {
    debugger;
    return this.http.put<RegisterRequest>(`${this.apiUrl}/${id}`, user);
  }

  // Delete user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
