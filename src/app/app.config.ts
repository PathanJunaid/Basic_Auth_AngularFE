import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/jwt.interceptor';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations'; // Add this
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Add this

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(), // Required for animations and MatSnackBar
    MatSnackBarModule,
    provideHttpClient(
      withInterceptors([jwtInterceptor]) // Ensure jwtInterceptor exists
    )
  ]
};