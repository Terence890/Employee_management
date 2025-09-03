import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  user = signal<User | null>(null);

  constructor() {
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
    };
    this.user.set(mockUser);
  }

  login(credentials: {email: string, password: string}):Observable<any> {
    return of({ id: '1', name: 'John Doe', email: credentials.email, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }).pipe(
      tap((user: any) => {
        this.user.set(user);
        this.router.navigate(['/']);
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return of(null);
      })
    );
  }

  register(user: {name: string, email: string, password: string}):Observable<any> {
     return of({ id: '2', ...user, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' }).pipe(
      tap((newUser: any) => {
        this.user.set(newUser);
        this.router.navigate(['/']);
      }),
      catchError(error => {
        console.error('Registration failed:', error);
        return of(null);
      })
    );
  }

  updateUser(updatedInfo: { name: string, email: string }): Observable<User | null> {
    const currentUser = this.user();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updatedInfo };
      this.user.set(updatedUser);
      return of(updatedUser);
    }
    return of(null);
  }


  logout() {
    this.user.set(null);
    this.router.navigate(['/signin']);
  }
}
