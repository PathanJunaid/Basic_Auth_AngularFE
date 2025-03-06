import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { AuthService } from '../../auth/services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  filteredAppointments = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'userId', 'date', 'timeSlot', 'status', 'actions'];
  selectedStatus: string = 'All';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.authService.getAllAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.filterAppointments();
      },
      error: (err) => {
        console.error('Error loading appointments:', err);
        this.snackBar.open('Failed to load appointments', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      }
    });
  }

  filterAppointments() {
    if (this.selectedStatus === 'All') {
      this.filteredAppointments.data = this.appointments;
    } else {
      this.filteredAppointments.data = this.appointments.filter(apt => apt.status === this.selectedStatus);
    }
  }

  logout() {
    this.authService.logout();
  }
}