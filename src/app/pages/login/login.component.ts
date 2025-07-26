import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 loginForm!: FormGroup;
  errorMessage = '';
  showPassword = false;

  constructor(private fb: FormBuilder, private http: HttpClient,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;

    this.http.post<any>('https://school-managment-a7daa0789071.herokuapp.com/api/auth/login', loginData).subscribe({
      
      next: (response) => {
        // Assume response contains a token
        localStorage.setItem('token', response.token);
        this.router.navigate(['/layout/profile']); // Redirect after login
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
