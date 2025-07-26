import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { UserResponse } from '../../models/user.model';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-students',
  imports: [CommonModule,RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {
  user: UserResponse | null = null;
  constructor(private profileService:ProfileService){
    this.profileService.currentUser();
  }
ngOnInit(): void {
    this.profileService.currentUser().subscribe({
      next: (userInfo: UserResponse) => {
        this.user = {
          id: userInfo.id ?? 0,
          firstName: userInfo.firstName ?? 'Unknown',
          lastName: userInfo.lastName ?? '',
          email: userInfo.email ?? 'Not Provided',
          phone: userInfo.phone ?? 'Not Provided',
          address: userInfo.address ?? 'Not Provided',
          status: userInfo.status ?? true,
          role: userInfo.role ?? 'GUEST'
        };
      },
      error: (err) => {
        console.error('Failed to fetch user profile', err);
        this.user = null;
      }
    });
  }
  
studentName = 'Rahul Sharma';
gpa = 3.75;
attendancePercentage = 92;
paidFees = 15000;
totalFees = 20000;



enrolledCourses = ['Mathematics', 'Computer Science', 'History'];

upcomingExams = [
  { subject: 'Physics', date: new Date('2025-08-10') },
  { subject: 'English', date: new Date('2025-08-15') }
];

todayTimetable = [
  { time: '9:00 AM', subject: 'Math' },
  { time: '10:15 AM', subject: 'Science' },
  { time: '11:30 AM', subject: 'English' }
];

homeworkPending = 3;

recentMessages = [
  { sender: 'Mrs. Kapoor', preview: 'Submit your assignment by Friday.' },
  { sender: 'Mr. Verma', preview: 'Prepare for the unit test next week.' }
];

libraryStats = {
  borrowed: 2,
  due: 1
};

}
