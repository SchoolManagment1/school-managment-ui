import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher',
  imports: [CommonModule,RouterLink],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {
dashboardCards = [
  {
    title: 'Manage Students',
    description: 'View, edit, or remove student records.',
    icon: 'fas fa-user-graduate',
    link: '/layout/student',
    buttonText: 'Manage'
  },
  {
    title: 'Assignments',
    description: 'Create and review class assignments.',
    icon: 'fas fa-tasks',
    link: '/layout/assignments',
    buttonText: 'View'
  },
  {
    title: 'Attendance',
    description: 'Mark and view student attendance.',
    icon: 'fas fa-user-check',
    link: '/layout/attendance',
    buttonText: 'Take'
  },
  {
    title: 'Grades',
    description: 'Enter and analyze student grades.',
    icon: 'fas fa-chart-line',
    link: '/teacher/grades',
    buttonText: 'Analyze'
  },
  {
    title: 'Announcements',
    description: 'Post and view class announcements.',
    icon: 'fas fa-bullhorn',
    link: '/teacher/announcements',
    buttonText: 'Post'
  },
  {
    title: 'Schedule',
    description: 'View and manage your teaching schedule.',
    icon: 'fas fa-calendar-alt',
    link: '/teacher/schedule',
    buttonText: 'View'
  }
];

recentActivities = [
  { icon: 'fas fa-check-circle', description: 'Graded 5 assignments in Class 10A' },
  { icon: 'fas fa-user-check', description: 'Marked attendance for Class 9B' },
  { icon: 'fas fa-bullhorn', description: 'Posted announcement for Class 11C' }
];

upcomingEvents = [
  { date: 'July 25', description: 'Parent-Teacher Meeting' },
  { date: 'July 28', description: 'Assignment Submission Deadline' },
  { date: 'July 30', description: 'Science Exhibition' }
];

}
