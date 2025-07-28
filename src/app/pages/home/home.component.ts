import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [ FooterComponent,HeaderComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.logout()
  }


  logout(): void {
  
    this.authService.logout(); // Clear token/session
    localStorage.clear();      // Optional: clear everything or just `localStorage.removeItem('token')`
    
  
}
}
