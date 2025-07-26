import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
private baseUrl = 'https://school-managment-a7daa0789071.herokuapp.com/api/users/me';

  constructor(private http: HttpClient) {}


currentUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}`);
  }
}
