import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-attendance',
  imports: [CommonModule,FormsModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {
    today: Date = new Date();
  selectedClass: string = '';
  selectedDate: string = this.formatDate(this.today);
  classes: string[] = [];
  students: Student[] = [];
  filteredStudents: any[] = [];

  attendanceRecords: {
    date: string;
    className: string;
    name: string;
    rollNo: string;
    status: string;
  }[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    debugger
    this.studentService.getAllStudents().subscribe({
      
      next: (res: Student[]) => {
        this.students = res;
        console.log(res);
        this.classes = [...new Set(this.students.map(s => s.studentClass))];
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching students:', err);
      }
    });
  }

  onClassChange(): void {
    this.filteredStudents = this.students
      .filter(s => s.studentClass === this.selectedClass)
      .map(s => ({
        ...s,
        attendanceStatus: ''
      }));
  }

  markAttendance(student: any, status: string): void {
    student.attendanceStatus = status;
  }

  submitAttendance(): void {
    if (!this.selectedClass || !this.selectedDate) {
      alert('⚠️ Please select both class and date.');
      return;
    }

    const attendanceForClass = this.filteredStudents.map(student => ({
      date: this.selectedDate,
      className: this.selectedClass,
      name: student.name,
      rollNo: student.rollNo,
      status: student.attendanceStatus || 'Absent'
    }));

    this.attendanceRecords.push(...attendanceForClass);

    alert(`✅ Attendance submitted for ${this.selectedClass} on ${this.selectedDate}.`);

    // Reset
    this.filteredStudents = [];
    this.selectedClass = '';
    this.selectedDate = this.formatDate(new Date());
  }

  filteredHistory(): any[] {
    return this.attendanceRecords.filter(
      record =>
        (!this.selectedClass || record.className === this.selectedClass) &&
        (!this.selectedDate || record.date === this.selectedDate)
    );
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // yyyy-mm-dd
  }


}
