import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7237'; // Your backend URL

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response: any) => {
          console.log(response); // Keep this for debugging
          localStorage.setItem('access_Token', response.accessToken);
          this.router.navigate(['/home']); // Redirect to /home instead of /
        })
      );
  }

  signup(userData: { email: string; password: string; name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/users`, userData)
      .pipe(
        tap((response: any) => {
          this.router.navigate(['/login']); // Redirect to /home instead of /
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
}