import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface User {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private currentUser = signal<User | null>(null);

  get currentUserValue() {
    return this.currentUser();
  }

  login(credentials: {email: string, password: string}):Observable<any> {
    return this.http.post('/api/auth/login', credentials).pipe(
      tap((user: any) => {
        this.currentUser.set(user);
        this.router.navigate(['/']);
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return of(null);
      })
    );
  }

  register(user: {name: string, email: string, password: string}):Observable<any> {
    return this.http.post('/api/auth/register', user).pipe(
      tap((user: any) => {
        this.currentUser.set(user);
        this.router.navigate(['/']);
      }),
      catchError(error => {
        console.error('Registration failed:', error);
        return of(null);
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    this.router.navigate(['/signin']);
  }
}
