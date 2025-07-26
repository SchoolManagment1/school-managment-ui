import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserResponse } from '../../models/user.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
 
user: UserResponse | null = null;

constructor(private authService: AuthService,private profileService:ProfileService) {}

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
  editProfile() {
    // Handle navigation or modal for editing
  }

  changePassword() {
    // Handle password change logic
  }
}
