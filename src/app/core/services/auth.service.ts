import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface User {
    id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    roles?: string[];
}

export interface LoginResponse {
    token: string;
    user: User;
    refreshToken?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    
    private readonly TOKEN_KEY = 'wms_auth_token';
    private readonly USER_KEY = 'wms_user';
    private readonly API_URL = '/api/auth'; // Update with your API endpoint

    private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() {}

    /**
     * Login user
     */
    login(username: string, password: string, rememberMe: boolean = false): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.API_URL}/login`, { username, password }).pipe(
            tap((response) => {
                this.setToken(response.token, rememberMe);
                this.setUser(response.user, rememberMe);
                this.currentUserSubject.next(response.user);
            }),
            catchError((error) => {
                throw error;
            })
        );
    }

    /**
     * Logout user
     */
    logout(): void {
        this.removeToken();
        this.removeUser();
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    /**
     * Get current user
     */
    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    /**
     * Get stored token
     */
    getToken(): string | null {
        const token = sessionStorage.getItem(this.TOKEN_KEY) || localStorage.getItem(this.TOKEN_KEY);
        return token;
    }

    /**
     * Set authentication token
     */
    private setToken(token: string, rememberMe: boolean): void {
        if (rememberMe) {
            localStorage.setItem(this.TOKEN_KEY, token);
        } else {
            sessionStorage.setItem(this.TOKEN_KEY, token);
        }
    }

    /**
     * Remove authentication token
     */
    private removeToken(): void {
        sessionStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
    }

    /**
     * Set user data
     */
    private setUser(user: User, rememberMe: boolean): void {
        const userData = JSON.stringify(user);
        if (rememberMe) {
            localStorage.setItem(this.USER_KEY, userData);
        } else {
            sessionStorage.setItem(this.USER_KEY, userData);
        }
    }

    /**
     * Get stored user
     */
    private getStoredUser(): User | null {
        const userData = sessionStorage.getItem(this.USER_KEY) || localStorage.getItem(this.USER_KEY);
        return userData ? JSON.parse(userData) : null;
    }

    /**
     * Remove user data
     */
    private removeUser(): void {
        sessionStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.USER_KEY);
    }

    /**
     * Check if user has specific role
     */
    hasRole(role: string): boolean {
        const user = this.getCurrentUser();
        return user?.roles?.includes(role) || false;
    }

    /**
     * Refresh token (if needed)
     */
    refreshToken(): Observable<LoginResponse> {
        const refreshToken = localStorage.getItem('wms_refresh_token');
        if (!refreshToken) {
            this.logout();
            return of({} as LoginResponse);
        }

        return this.http.post<LoginResponse>(`${this.API_URL}/refresh`, { refreshToken }).pipe(
            tap((response) => {
                this.setToken(response.token, true);
                if (response.user) {
                    this.setUser(response.user, true);
                    this.currentUserSubject.next(response.user);
                }
            })
        );
    }
}
