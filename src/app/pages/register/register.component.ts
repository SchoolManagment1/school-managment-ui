import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterRequest } from '../../models/userRequest.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

registerForm!: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean =false;
  successMessage: string = '';
errorMessage: string = '';

  constructor(private fb: FormBuilder,private userService: UserService,private router:Router) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        address: ['', Validators.required],
       
      },
      {
        validators: [this.passwordMatchValidator],
      }
    );
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


    
  onSubmit(): void {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched(); // show validation errors
    return;
  }

  const formValue = this.registerForm.value;

  const payload: RegisterRequest = {
    firstName: formValue.firstName,
    lastName: formValue.lastName,
    email: formValue.email,
    phone: formValue.phone,
    address: formValue.address,
    role: formValue.role,
    password: formValue.password || 'default@123', // fallback password
  };

  this.isLoading = true; // optional: for showing spinner/loading UI

  this.userService.createUser(payload).subscribe({
    next: (response) => {
      console.log('User registered successfully:', response);
      this.successMessage = 'Registration successful!';
      this.registerForm.reset();
       setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000); // optional: redirect to login
    },
    error: (error: HttpErrorResponse) => {
      console.error('Error creating user:', error);
      this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
    },
    complete: () => {
      this.isLoading = false;
    }
  });
}


  onCancel(): void {
    this.registerForm.reset();
  }

}
