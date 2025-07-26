import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule,RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private router: Router) {}

 stats = [
  {
    title: 'Users',
    count: 42,
    icon: 'fas fa-users',
    color: 'primary'
  },
  {
    title: 'Courses',
    count: 18,
    icon: 'fas fa-book',
    color: 'success'
  },
  {
    title: 'Classes',
    count: 12,
    icon: 'fas fa-school',
    color: 'info'
  },
  {
    title: 'Exams',
    count: 8,
    icon: 'fas fa-clipboard-list',
    color: 'warning'
  }
];

quickActions = [
  {
    title: 'Manage Users',
    icon: 'fas fa-users-cog',
    color: 'primary',
    route: '/layout/admin/users'
  },
  {
    title: 'Add Course',
    icon: 'fas fa-plus-circle',
    color: 'success',
    route: '/admin/courses'
  },
  {
    title: 'Schedule Exam',
    icon: 'fas fa-calendar-plus',
    color: 'info',
    route: '/admin/exams'
  },
  {
    title: 'Send Notice',
    icon: 'fas fa-bullhorn',
    color: 'warning',
    route: '/admin/notices'
  }
];

navigateTo(route: string): void {
  this.router.navigate([route]);
}
}
