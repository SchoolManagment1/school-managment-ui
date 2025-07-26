import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
showPassword: boolean = false;
  users: Student[] = [];
  

  userForm!: FormGroup;
  editingUser: Student | null = null;
  showModal: boolean = false;

  constructor(private fb: FormBuilder, private userService: StudentService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    studentClass: ['', [Validators.required]],
    rollNumber: [null, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
   
   phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],

   
  });

    this.fetchUsers();
    
  }

  fetchUsers(): void {
    this.userService.getAllStudents().subscribe({
      next: (res: Student[]) => {
        this.users = res;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching users:', err);
      },
    });
  }

 

  openModal(user: Student | null = null): void {
    this.editingUser = user;
    this.userForm.reset();

    if (user) {
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        phone:user.phone,
        class:user.studentClass,
        rollnumber:user.rollNumber
       
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

    const payload: Student = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      id: formValue.id,
      studentClass: formValue.studentClass,
      rollNumber: formValue.rollNumber,
      status: formValue.status,
      phone: formValue.phone,
    };

    if (this.editingUser) {
      debugger;
      this.userService.updateStudent(this.editingUser.id, payload).subscribe({
        next: () => {
          this.fetchUsers();
          this.closeModal();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error updating user:', err);
        },
      });
    } else {
      this.userService.createStudent(payload).subscribe({
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
      this.userService.deleteStudent(userId).subscribe({
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
  this.userService.updateStudent(this.editableUser.id,this.editableUser).subscribe(() => {
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
