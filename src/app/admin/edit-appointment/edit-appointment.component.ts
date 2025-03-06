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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../auth/services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-appointment',
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
    NgFor,
    NgIf
  ],
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss']
})
export class EditAppointmentComponent implements OnInit {
  editForm: FormGroup;
  users: any[] = [];
  timeSlots = [
    '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
    '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00',
    '17:00-18:00', '18:00-19:00', '19:00-20:00'
  ];
  disabledSlots: string[] = [];
  appointmentId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      id: [''],
      userId: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.appointmentId = this.route.snapshot.paramMap.get('id');
    if (this.appointmentId) {
      this.authService.getAppointmentById(this.appointmentId).subscribe({
        next: (appointment) => {
          console.log(appointment)
          this.editForm.patchValue({
            id: appointment.id,
            userId: appointment.userId,
            date: new Date(appointment.date).toISOString().split('T')[0],
            timeSlot: appointment.timeSlot,
            status: appointment.status
          });
        },
        error: (err) => {
          this.snackBar.open('Failed to load appointment', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        }
      });
    }

    this.authService.getAllUsers().subscribe((users) => this.users = users);

    this.editForm.get('date')?.valueChanges.subscribe((date) => {
      if (date) {
        this.authService.getAllAppointments().subscribe((appointments) => {
          this.disabledSlots = appointments
            .filter(apt => new Date(apt.date).toDateString() === new Date(date).toDateString() && apt.id !== this.appointmentId)
            .map(apt => apt.timeSlot);
        });
      }
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const id = this.editForm.value.id;
      this.authService.updateAppointment(id, this.editForm.value).subscribe({
        next: () => {
          this.snackBar.open('Appointment updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/admin/appointments']);
        },
        error: (err) => {
          this.snackBar.open('Failed to update appointment: ' + err.message, 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        }
      });
    } else {
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
    }
  }

  logout() {
    this.authService.logout();
  }
}