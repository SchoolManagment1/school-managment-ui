import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterRequest } from '../../models/userRequest.model';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  showPassword: boolean = false;
  users: UserResponse[] = [];
  

  userForm!: FormGroup;
  editingUser: UserResponse | null = null;
  showModal: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      role: [null, Validators.required],
      password: [''], // optional field, used only in create mode
    });

    this.fetchUsers();
    
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (res: UserResponse[]) => {
        this.users = res;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching users:', err);
      },
    });
  }

 

  openModal(user: UserResponse | null = null): void {
    this.editingUser = user;
    this.userForm.reset();

    if (user) {
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      });

      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    } else {
      this.userForm.get('password')?.setValidators(Validators.required);
      this.userForm.get('password')?.updateValueAndValidity();
    }

    this.showModal = true;
  }

  closeModal(): void {
    this.userForm.reset();
    this.editingUser = null;
    this.showModal = false;
  }

  submitForm(): void {
    debugger
    if (this.userForm.invalid) return;

    const formValue = this.userForm.value;

    const payload: RegisterRequest = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phone: formValue.phone,
      address: formValue.address,
      role: formValue.role,
      password: formValue.password || 'default@123', // for create or fallback
    };

    if (this.editingUser) {
      debugger;
      this.userService.updateUser(this.editingUser.id, payload).subscribe({
        next: () => {
          this.fetchUsers();
          this.closeModal();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error updating user:', err);
        },
      });
    } else {
      this.userService.createUser(payload).subscribe({
        next: () => {
          this.fetchUsers();
          this.closeModal();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error creating user:', err);
        },
      });
    }
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.fetchUsers();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error deleting user:', err);
        },
      });
    }
  }


editingUserId: number | null = null;
editableUser: any = {};

editRow(user: any): void {
  this.editingUserId = user.id;
  this.editableUser = { ...user }; // clone to avoid direct mutation
}

cancelEdit(): void {
  this.editingUserId = null;
  this.editableUser = {};
}

updateUser(): void {
  debugger;
  this.userService.updateUser(this.editableUser.id,this.editableUser).subscribe(() => {
    // Update list with new data
    const index = this.users.findIndex(u => u.id === this.editableUser.id);
    if (index !== -1) {
      this.users[index] = { ...this.editableUser };
    }
    this.cancelEdit();
  });
}


 passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
