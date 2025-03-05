import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { authGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { loggedInGuard } from './auth/guards/logged-in.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [loggedInGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [loggedInGuard] },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '/login' }
];