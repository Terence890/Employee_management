import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = '/api/auth';
  private userApiUrl = '/api/user';

  user = signal<User | null>(null);

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem('auth_token');
    const userJson = localStorage.getItem('user');
    if (token && userJson && userJson !== 'undefined') {
      try {
        this.user.set(JSON.parse(userJson));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        this.logout();
      }
    } else if (token) {
      // If there's a token but no user data, or user data is invalid, logout
      this.logout();
    }
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.user.set(response.user);
      }),
      catchError(this.handleError<AuthResponse>('login'))
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, { responseType: 'text' }).pipe(
      catchError(this.handleError<any>('register'))
    );
  }

  updateUser(userData: Partial<User>): Observable<User> {
    const user = this.user();
    if (!user) {
      return of(); // Or handle error appropriately
    }
    return this.http.put<User>(`${this.userApiUrl}/${user.id}`, userData).pipe(
      tap(updatedUser => {
        this.user.set(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }),
      catchError(this.handleError<User>('updateUser'))
    );
  }

  logout() {
    localStorage.clear();
    this.user.set(null);
    this.router.navigate(['/signin']);
  }

  isAuthenticated(): boolean {
    return !!this.user();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      // Let the component handle the error message
      return of(result as T);
    };
  }
}
