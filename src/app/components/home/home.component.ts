import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu'; // For the dropdown menu
import { MatButtonModule } from '@angular/material/button'; // For the button
import { MatToolbarModule } from '@angular/material/toolbar'; // Already in use
import { AuthService } from '../../auth/services/auth.service'; // Adjust path as needed

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'Welcome to the Home Page';

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService
  }
}