import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../auth/services/auth.service';
import { RouterModule } from '@angular/router';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [MatCardModule, RouterModule, MatMenu, MatToolbar,MatMenuModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  dailyCount: number = 0;
  weeklyCount: number = 0;
  monthlyCount: number = 0;
  yearlyCount: number = 0;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserAppointments().subscribe((appointments) => {
      const now = new Date();
      const startOfDay = new Date(now.setHours(0, 0, 0, 0));
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfYear = new Date(now.getFullYear(), 0, 1);

      this.dailyCount = appointments.filter(apt => 
        new Date(apt.date).toDateString() === startOfDay.toDateString()
      ).length;

      this.weeklyCount = appointments.filter(apt => 
        new Date(apt.date) >= startOfWeek
      ).length;

      this.monthlyCount = appointments.filter(apt => 
        new Date(apt.date) >= startOfMonth
      ).length;

      this.yearlyCount = appointments.filter(apt => 
        new Date(apt.date) >= startOfYear
      ).length;
    });
  }
  logout() {
    this.authService.logout();
  }
}