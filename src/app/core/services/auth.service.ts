import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

export interface User {
  id: string;
  username: string;
  email: string;
  roles?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'gwms_auth_token';
  private readonly USER_KEY = 'gwms_user';

  private readonly BASE_URL = 'http://203.100.79.155';

  private readonly LOGIN_API = `${this.BASE_URL}/api/Auth/login`;
  private readonly TOKEN_API = `${this.BASE_URL}/api/Auth/GetToken`;


  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  // ✅ PAGE LOAD TOKEN
  getInitialToken(): Observable<any> {
    return this.http.post<any>(this.TOKEN_API, {}).pipe(
      tap(res => {
        const token = res.authToken;
        sessionStorage.setItem(this.TOKEN_KEY, token);
      })
    );
  }

  //  LOGIN (NO ENCRYPTION)
  login(username: string, password: string, rememberMe: boolean = false): Observable<any> {
    const body = {
      userName: username,
      password: password   
    };

    return this.http.post<any>(this.LOGIN_API, body); 
    
  }
   

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  //signup
  register(userData: any): Observable<any> {
    
    const REGISTER_API = `${this.BASE_URL}/api/Login/SignUpUser`;

    return this.http.post<any>(REGISTER_API, userData).pipe(
      tap(res => {
        
        console.log('User Registered Successfully in WMS');
      })
    );
  }
  

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY) || localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string, rememberMe: boolean): void {
    if (rememberMe) localStorage.setItem(this.TOKEN_KEY, token);
    else sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  private setUser(user: User, rememberMe: boolean): void {
    const data = JSON.stringify(user);
    if (rememberMe) localStorage.setItem(this.USER_KEY, data);
    else sessionStorage.setItem(this.USER_KEY, data);
  }

  private getStoredUser(): User | null {
    const data = sessionStorage.getItem(this.USER_KEY) || localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }
}
