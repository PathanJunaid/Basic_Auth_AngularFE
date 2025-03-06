import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    RouterModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  users: any[] = [];
  timeSlots = [
    '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
    '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00',
    '17:00-18:00', '18:00-19:00', '19:00-20:00'
  ];
  disabledSlots: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      userId: ['', Validators.required],
      date: ['', Validators.required],
      timeslot: ['', Validators.required],
      // status: ['Scheduled', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.getAllUsers().subscribe((users) => this.users = users);
    this.appointmentForm.get('date')?.valueChanges.subscribe((date) => {
      if (date) {
        this.authService.getAllAppointments().subscribe((appointments) => {
          this.disabledSlots = appointments
            .filter(apt => new Date(apt.date).toDateString() === new Date(date).toDateString())
            .map(apt => apt.timeSlot);
        });
      }
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const formData = this.appointmentForm.value;

      // Convert Date to 'YYYY-MM-DD' (ISO 8601)
      formData.date = this.formatDate(formData.date);

      this.authService.createAppointment(formData).subscribe({
        next: () => this.router.navigate(['/admin/appointments']),
        error: (err) => this.snackBar.open(err.message, 'Close', { duration: 3000, panelClass: ['error-snackbar'] })
      });
    }
  }

  // Utility function to format date
  private formatDate(date: any): string {
    if (!date) return '';

    // Convert Date to YYYY-MM-DD format
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Extracts 'YYYY-MM-DD'
  }

  logout() {
    this.authService.logout();
  }
}