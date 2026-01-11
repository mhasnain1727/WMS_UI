import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule],
    template: `
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <div class="mb-6">
                                <i class="pi pi-box text-6xl text-primary"></i>
                            </div>
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-bold mb-2">Warehouse Management System</div>
                            <span class="text-muted-color font-medium text-lg">Sign in to access your account</span>
                        </div>

                        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
                            <div class="mb-5">
                                <label for="username" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Username</label>
                                <input 
                                    pInputText 
                                    id="username" 
                                    type="text" 
                                    placeholder="Enter your username" 
                                    class="w-full md:w-120 mb-3" 
                                    [(ngModel)]="username" 
                                    name="username"
                                    required
                                    [disabled]="loading"
                                />
                            </div>

                            <div class="mb-5">
                                <label for="password" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                                <p-password 
                                    id="password" 
                                    [(ngModel)]="password" 
                                    placeholder="Enter your password" 
                                    styleClass="mb-3" 
                                    [fluid]="true" 
                                    [feedback]="false"
                                    [toggleMask]="true"
                                    name="password"
                                    [disabled]="loading"
                                    required
                                ></p-password>
                            </div>

                            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                <div class="flex items-center">
                                    <p-checkbox 
                                        [(ngModel)]="rememberMe" 
                                        id="rememberme" 
                                        binary 
                                        class="mr-2"
                                        name="rememberMe"
                                        [disabled]="loading"
                                    ></p-checkbox>
                                    <label for="rememberme" class="cursor-pointer">Remember me</label>
                                </div>
                                <a routerLink="/auth/forgot-password" class="font-medium no-underline ml-2 text-right cursor-pointer text-primary hover:underline">
                                    Forgot password?
                                </a>
                            </div>

                            <p-button 
                                type="submit"
                                label="Sign In" 
                                styleClass="w-full" 
                                [loading]="loading"
                                [disabled]="!loginForm.form.valid || loading"
                            ></p-button>
                        </form>

                        <div class="mt-6 text-center text-sm text-muted-color">
                            <span>Don't have an account? </span>
                            <a routerLink="/auth/register" class="text-primary font-medium no-underline hover:underline cursor-pointer">Contact Administrator</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Login {
    private authService = inject(AuthService);
    private router = inject(Router);
    private messageService = inject(MessageService);

    username: string = '';
    password: string = '';
    rememberMe: boolean = false;
    loading: boolean = false;

    onSubmit(): void {
        if (!this.username || !this.password) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Validation Error',
                detail: 'Please enter both username and password',
                life: 3000
            });
            return;
        }

        this.loading = true;
        this.authService.login(this.username, this.password, this.rememberMe).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Login Successful',
                    detail: 'Welcome back!',
                    life: 3000
                });
                
                // Get return URL from route parameters or default to dashboard
                const returnUrl = this.router.parseUrl(this.router.url).queryParams['returnUrl'] || '/';
                this.router.navigate([returnUrl]);
            },
            error: (error) => {
                this.loading = false;
                // Error handling is done by the error interceptor
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
}
