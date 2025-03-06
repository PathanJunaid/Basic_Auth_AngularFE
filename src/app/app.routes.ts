import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { AnalyticsComponent } from './user/analytics/analytics.component';
import { CreateAppointmentComponent } from './admin/create-appointment/create-appointment.component';
import { AppointmentsComponent } from './admin/appointments/appointments.component';
import { EditAppointmentComponent } from './admin/edit-appointment/edit-appointment.component'; // Add this
import { authGuard } from './auth/guards/auth.guard';
import { loggedInGuard } from './auth/guards/logged-in.guard';
import { adminGuard } from './auth/guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [loggedInGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [loggedInGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [authGuard] },
  { path: 'admin/create-appointment', component: CreateAppointmentComponent, canActivate: [adminGuard] },
  { path: 'admin/appointments', component: AppointmentsComponent, canActivate: [adminGuard] },
  { path: 'admin/edit-appointment/:id', component: EditAppointmentComponent, canActivate: [adminGuard] }, // Add this
  { path: '**', redirectTo: '/login' }
];