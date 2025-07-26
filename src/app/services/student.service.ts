// src/app/services/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'https://student-service-f8470ec9e9d3.herokuapp.com/api/students'; // Update base URL accordingly

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    debugger
    return this.http.get<Student[]>(`${this.baseUrl}`);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}`, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
