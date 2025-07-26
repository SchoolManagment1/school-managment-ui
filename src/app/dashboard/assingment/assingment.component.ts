import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface Assignment {
  id: number;
  title: string;
  className: string;
  subject: string;
  dueDate: string;
  description?: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-assingment',
  imports: [FormsModule,CommonModule],
  templateUrl: './assingment.component.html',
  styleUrl: './assingment.component.css'
})
export class AssingmentComponent {
assignments: Assignment[] = [];
  newAssignment: Assignment = {
    id: 0,
    title: '',
    className: '',
    subject: '',
    dueDate: '',
    description: '',
    status: 'Active'
  };

  classList = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

  ngOnInit(): void {
    // Mock data load
    this.assignments = [
      {
        id: 1,
        title: 'Math Homework',
        className: 'Class 3',
        subject: 'Mathematics',
        dueDate: '2025-08-01',
        status: 'Active'
      }
    ];
  }

  submitAssignment1(): void {
    const newId = this.assignments.length + 1;
    this.assignments.push({ ...this.newAssignment, id: newId });
    this.resetForm();
    const modal = document.getElementById('createAssignmentModal');
    
  }
submitAssignment(): void {
  const newId = this.assignments.length + 1;
  this.assignments.push({ ...this.newAssignment, id: newId });

  // Reset form
  this.resetForm();

  // Simulate clicking the close button
  const closeButton = document.querySelector('#createAssignmentModal .btn-close') as HTMLElement;
  if (closeButton) {
    closeButton.click();
  }
}

  resetForm(): void {
    this.newAssignment = {
      id: 0,
      title: '',
      className: '',
      subject: '',
      dueDate: '',
      description: '',
      status: 'Active'
    };
  }

  viewAssignment(a: Assignment): void {
    alert(`Viewing assignment: ${a.title}`);
  }

  deleteAssignment(id: number): void {
    this.assignments = this.assignments.filter(a => a.id !== id);
  }
}
