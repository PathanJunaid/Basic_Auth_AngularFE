import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../auth/services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  futureAppointments: any[] = [];
  completedAppointments: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserAppointments().subscribe((appointments) => {
      console.log(appointments);
      const now = new Date();
      this.futureAppointments = appointments.filter(apt => new Date(apt.date) > now && apt.status !== 'Cancelled');
      this.completedAppointments = appointments.filter(apt => apt.status === 'Completed');
    });
  }

  logout() {
    this.authService.logout();
  }
}