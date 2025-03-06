import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7237'; // Adjust to your backend URL

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('access_Token', response.accessToken);
      }),
      tap(() => {
        const role = this.getRole();
        if (role === 'ADMIN') {
          this.router.navigate(['admin/appointments']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }

  signup(userData: { email: string; password: string; name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/users`, userData).pipe(
      tap((response: any) => {
        localStorage.setItem('access_Token', response.accessToken);
        this.router.navigate(['/login']);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_Token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_Token');
  }

  getRole(): string | null {
    const token = localStorage.getItem('access_Token');
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log(decoded);
      return decoded['role'] || null; // Assuming 'role' claim in JWT
    }
    return null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  getUserAppointments(): Observable<any[]> {
    return this.http.get<{ data: { $values: any[] } }>(`${this.apiUrl}/appointments`).pipe(
      map(response => response.data.$values) // Extract the '$values' array
    );
  }

  getAppointmentById(id: string): Observable<any> {
    return this.http.get<{ data: any }>(`${this.apiUrl}/api/admin/Appointment/${id}`).pipe(
      map(response => {
        return response.data; // Return the data object directly
      })
    );
  }
  getAllAppointments(): Observable<any[]> {
    return this.http.get<{ data: { $values: any[] } }>(`${this.apiUrl}/api/admin/Appointment`).pipe(
      map(response => response.data.$values) // Extract the '$values' array
    );
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<{ data: { $values: any[] } }>(`${this.apiUrl}/api/users`).pipe(
      map(response => {
        console.log(response)
        return response.data.$values
      }) // Extract the '$values' array
    );
  }

  createAppointment(appointment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/admin/Appointment`, appointment);
  }

  updateAppointment(id: string, appointment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/admin/Appointment/${id}`, appointment);
  }
}