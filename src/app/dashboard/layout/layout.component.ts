import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';




@Component({
  selector: 'app-layout',
  imports: [CommonModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
   role: string | null = '';
  username: string | null = '';
  dashboardLink: string = '';
 
  isSmallScreen = true;
  
  
 

  constructor(private authService: AuthService, private router: Router,private observer: BreakpointObserver) {
    const user = this.authService.getUserInfo(); // Decode JWT
    this.role = user?.role || user?.roles?.[0] || 'USER';
    this.username = user?.firstName || user?.email;
    this.observer.observe([Breakpoints.Handset]).subscribe(result => {
      this.isSmallScreen = result.matches;
       this.isSidebarOpen = !this.isMobile;
    });
  }


  

  logout(): void {
  const confirmed = window.confirm('Are you sure you want to logout?');

  if (confirmed) {
    this.authService.logout(); // Clear token/session
    localStorage.clear();      // Optional: clear everything or just `localStorage.removeItem('token')`
    this.router.navigate(['/login']);
  }
  
}

   
  isSidebarOpen: boolean = true;
  isMobile: boolean = window.innerWidth <= 768;


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth <= 768;
    this.isSidebarOpen = !this.isMobile;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebarOnMobile() {
    if (this.isMobile) {
      this.isSidebarOpen = false;
    }

    
  }



navigateToDashboard(): void {
  debugger;
   

    switch (this.role?.toLocaleLowerCase()) {
      case 'admin':
        this.router.navigate(['layout/admin']);
        break;
      case 'student':
        this.router.navigate(['/student/dashboard']);
        break;
      case 'teacher':
        this.router.navigate(['dashboard/teacher/dashboard']);
        break;
      default:
        this.router.navigate(['']); // fallback
    }
  }
  

 
menuItems = [
  { label: 'Profile', link: '/layout/profile', icon: 'fas fa-user-circle' },
  { label: 'Dashboard', link: '/layout/admin', icon: 'fas fa-chart-line', role: 'ADMIN' },
  { label: 'Dashboard', link: '/layout/students', icon: 'fas fa-user-graduate', role: 'STUDENT' },
  { label: 'Dashboard', link: '/layout/teachers', icon: 'fas fa-chalkboard-teacher', role: 'TEACHER' },
  { label: 'Courses', link: '/layout/courses', icon: 'fas fa-book' },
  { label: 'Classes', link: '/admin/classes', icon: 'fas fa-school' },
  { label: 'Exams', link: '/admin/exams', icon: 'fas fa-clipboard-list' },
  { label: 'Fees', link: '/admin/fees', icon: 'fas fa-money-bill' },
  { label: 'Notices', link: '/admin/notices', icon: 'fas fa-bullhorn' },
  { label: 'Users', link: '/admin/users', icon: 'fas fa-users' },
  { label: 'Reports', link: '/admin/reports', icon: 'fas fa-file-chart-line' },
  { label: 'Settings', link: '/admin/settings', icon: 'fas fa-cogs' }
];

// Optional filter based on role
get filteredMenu() {
  return this.menuItems.filter(item => !item.role || item.role === this.role);
}

}