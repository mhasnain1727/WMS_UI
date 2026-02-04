import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../core/services/auth.service';
import { CryptoJsService } from '../../layout/service/crypto-js.service';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule],
    styles: [`
        :host ::ng-deep {
            .p-password input {
                border: 2px solid var(--surface-200) !important;
                border-radius: 0.75rem !important;
                background: var(--surface-50) !important;
                transition: all 0.2s ease !important;
                color: var(--surface-900) !important;
                font-size: 1rem !important;
                padding: 0.75rem 1rem 0.75rem 2.5rem !important;
            }

            .p-password input:focus {
                border-color: var(--primary-color) !important;
                background: white !important;
                box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1) !important;
            }

            .dark .p-password input {
                border-color: var(--surface-700) !important;
                background: var(--surface-800) !important;
                color: var(--surface-0) !important;
            }

            .dark .p-password input:focus {
                background: var(--surface-700) !important;
            }

            .p-password-toggle {
                right: 1rem !important;
                color: var(--surface-400) !important;
            }

            .p-checkbox .p-checkbox-box {
                border-radius: 0.375rem !important;
                border: 2px solid var(--surface-300) !important;
                transition: all 0.2s ease !important;
            }

            .p-checkbox .p-checkbox-box.p-highlight {
                background: var(--primary-color) !important;
                border-color: var(--primary-color) !important;
            }

            .p-checkbox .p-checkbox-box:hover {
                border-color: var(--primary-color) !important;
            }

            /* Custom animations */
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .animate-fade-in-up {
                animation: fadeInUp 0.6s ease-out;
            }

            /* Responsive improvements */
            @media (max-width: 1024px) {
                /* Mobile: Stack layout */
                .min-h-screen {
                    min-height: 100vh;
                }
            }

            @media (max-width: 640px) {
                .p-password input,
                input.p-inputtext {
                    font-size: 16px !important; /* Prevent zoom on iOS */
                }

                /* Adjust spacing for mobile */
                .space-y-4 > * + * {
                    margin-top: 0.75rem !important;
                }
            }
        }

        /* Background animations */
        .bg-pattern {
            background-image:
                radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.05) 0%, transparent 50%);
        }
    `],
    template: `
        <div class="min-h-screen flex overflow-hidden">
            <!-- Left Side - Branding Section -->
            <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
                <!-- Background Pattern Overlay -->
                <div class="absolute inset-0 opacity-10">
                    <div class="absolute top-10 left-10 text-8xl text-primary"><i class="pi pi-building"></i></div>
                    <div class="absolute top-20 right-20 text-6xl text-primary-400"><i class="pi pi-file-text"></i></div>
                    <div class="absolute bottom-20 left-20 text-7xl text-primary-300"><i class="pi pi-chart-line"></i></div>
                    <div class="absolute bottom-10 right-10 text-5xl text-primary-500"><i class="pi pi-users"></i></div>
                </div>

                <!-- Content -->
                <div class="relative z-10 flex flex-col justify-center items-center w-full p-6 text-white">
                    <div class="max-w-md text-center animate-fade-in-up">
                        <!-- Main Icon -->
                        <div class="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-10 rounded-full mb-4 backdrop-blur-sm border border-white border-opacity-20">
                            <i class="pi pi-building text-4xl text-white"></i>
                        </div>

                        <!-- Title -->
                        <h1 class="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Work Management System
                        </h1>

                        <!-- Subtitle -->
                        <p class="text-lg text-gray-300 mb-4 leading-relaxed">
                            Infrastructure Management Portal for efficient project execution and monitoring.
                        </p>

                        <!-- Feature List -->
                        <div class="space-y-2 text-left">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-primary bg-opacity-20 rounded-full flex items-center justify-center">
                                    <i class="pi pi-check text-primary text-sm"></i>
                                </div>
                                <span class="text-gray-300">Project estimation & approvals</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-primary bg-opacity-20 rounded-full flex items-center justify-center">
                                    <i class="pi pi-check text-primary text-sm"></i>
                                </div>
                                <span class="text-gray-300">Tender & contract management</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-primary bg-opacity-20 rounded-full flex items-center justify-center">
                                    <i class="pi pi-check text-primary text-sm"></i>
                                </div>
                                <span class="text-gray-300">Progress monitoring & reporting</span>
                            </div>
                        </div>

                        <!-- Decorative Elements -->
                        <div class="absolute top-8 right-8 text-white opacity-20">
                            <i class="pi pi-cog text-3xl"></i>
                        </div>
                        <div class="absolute bottom-8 left-8 text-white opacity-20">
                            <i class="pi pi-shield text-2xl"></i>
                        </div>
                    </div>
                </div>

                <!-- Geometric Shapes -->
                <div class="absolute top-1/4 left-1/4 w-32 h-32 border border-white border-opacity-10 rounded-full"></div>
                <div class="absolute bottom-1/4 right-1/4 w-24 h-24 border border-primary border-opacity-20 rounded-lg transform rotate-45"></div>
            </div>

            <!-- Right Side - Login Form -->
            <div class="w-full lg:w-1/2 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-surface-950 dark:via-surface-900 dark:to-surface-800 flex items-center justify-center p-2 lg:p-4 relative overflow-hidden">
                <!-- Background Pattern for Mobile -->
                <div class="absolute inset-0 opacity-5 dark:opacity-10 lg:hidden">
                    <div class="absolute top-10 left-10 text-6xl text-primary"><i class="pi pi-building"></i></div>
                    <div class="absolute top-20 right-20 text-4xl text-primary-400"><i class="pi pi-file-text"></i></div>
                    <div class="absolute bottom-20 left-20 text-5xl text-primary-300"><i class="pi pi-chart-line"></i></div>
                    <div class="absolute bottom-10 right-10 text-3xl text-primary-500"><i class="pi pi-users"></i></div>
                </div>

                <div class="w-full max-w-md relative z-10 animate-fade-in-up">
                    <!-- Main Card -->
                    <div class="w-full bg-white dark:bg-surface-900 rounded-2xl shadow-2xl border border-surface-200 dark:border-surface-700 overflow-hidden transform transition-all duration-300 hover:shadow-3xl animate-fade-in-up">
                        <!-- Header Section -->
                        <div class="bg-gradient-to-r from-primary via-primary-600 to-primary-700 p-4 text-center relative">
                            <!-- Home Button -->
                            <div class="absolute top-3 right-3">
                                <p-button
                                    routerLink="/home"
                                    label="Home"
                                    icon="pi pi-home"
                                    styleClass="p-button-sm p-button-outlined p-button-text bg-white bg-opacity-10 border-white border-opacity-30 text-white hover:bg-opacity-20 transition-all duration-200"
                                    pRipple
                                ></p-button>
                            </div>

                            <div class="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-3 backdrop-blur-sm">
                                <i class="pi pi-sign-in text-xl text-white"></i>
                            </div>
                            <h2 class="text-white text-xl font-bold mb-1">Welcome Back</h2>
                            <p class="text-primary-100 text-sm font-medium">Sign in to your account</p>
                        </div>

                        <!-- Form Section -->
                        <div class="p-6">
                            <div class="text-center mb-6">
                                <p class="text-muted-color text-sm">Enter your credentials to access the system</p>
                            </div>

                        <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="space-y-4">
                            <!-- Username Field -->
                            <div class="space-y-1">
                                <label for="username" class="block text-surface-900 dark:text-surface-0 font-semibold text-xs uppercase tracking-wide">
                                    <i class="pi pi-user mr-2 text-primary"></i>Username
                                </label>
                                <div class="relative">
                                    <input
                                        pInputText
                                        id="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        class="w-full p-3 pl-12 border-2 border-surface-200 dark:border-surface-700 rounded-xl bg-surface-50 dark:bg-surface-800 focus:border-primary focus:bg-white dark:focus:bg-surface-700 transition-all duration-200 text-surface-900 dark:text-surface-0 placeholder-surface-400"
                                        [(ngModel)]="username"
                                        name="username"
                                        required
                                        [disabled]="loading"
                                    />
                                    <!-- <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 z-10">
                                        <i class="pi pi-user"></i>
                                    </div> -->
                                </div>
                            </div>

                            <!-- Password Field -->
                            <div class="space-y-1">
                                <label for="password" class="block text-surface-900 dark:text-surface-0 font-semibold text-xs uppercase tracking-wide">
                                    <i class="pi pi-lock mr-2 text-primary"></i>Password
                                </label>
                                <div class="relative">
                                    <p-password
                                        id="password"
                                        [(ngModel)]="password"
                                        placeholder="Enter your password"
                                        styleClass="w-full"
                                        [inputStyle]="{'width': '100%', 'padding': '0.75rem 1rem 0.75rem 2.5rem', 'border': '2px solid var(--surface-200)', 'border-radius': '0.75rem', 'background': 'var(--surface-50)', 'transition': 'all 0.2s ease', 'color': 'var(--surface-900)'}"
                                        [inputStyleClass]="'dark:border-surface-700 dark:bg-surface-800 dark:text-surface-0 dark:placeholder-surface-400 focus-within:border-primary focus-within:bg-white dark:focus-within:bg-surface-700'"
                                        [fluid]="true"
                                        [feedback]="false"
                                        [toggleMask]="true"
                                        name="password"
                                        [disabled]="loading"
                                        required
                                    ></p-password>
                                    <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 z-10">
                                        <i class="pi pi-lock"></i>
                                    </div>
                                </div>
                            </div>

                            <!-- Remember Me and Forgot Password -->
                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-1">
                                <div class="flex items-center space-x-3">
                                    <p-checkbox
                                        [(ngModel)]="rememberMe"
                                        id="rememberme"
                                        binary
                                        name="rememberMe"
                                        [disabled]="loading"
                                        inputId="rememberme"
                                        styleClass="custom-checkbox"
                                    ></p-checkbox>
                                    <label for="rememberme" class="text-sm text-surface-600 dark:text-surface-300 cursor-pointer hover:text-primary transition-colors">
                                        Keep me signed in
                                    </label>
                                </div>
                                <a routerLink="/auth/forgot-password"
                                   class="text-sm text-primary hover:text-primary-600 font-medium transition-colors duration-200 hover:underline">
                                    Forgot password?
                                </a>
                            </div>

                            <!-- Sign In Button -->
                            <div class="pt-1">
                                <p-button
                                    type="submit"
                                    label="Sign In to Portal"
                                    styleClass="w-full p-3 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 border-none rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                    [loading]="loading"
                                    [disabled]="!loginForm.form.valid || loading"
                                ></p-button>
                            </div>
                        </form>

                        <!-- Footer -->
                        <div class="mt-4 pt-3 border-t border-surface-200 dark:border-surface-700 text-center">
                                <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">
                                    <i class="pi pi-info-circle mr-1"></i>
                                    Don't have an account?
                                </p>
                                <a routerLink="/auth/signup"
                                   class="inline-flex items-center text-primary hover:text-primary-600 font-medium transition-colors duration-200 hover:underline text-sm">
                                    <i class="pi pi-user-plus mr-2"></i>
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Trust Indicators -->
                    <div class="mt-3 text-center animate-fade-in-up" style="animation-delay: 0.3s; animation-fill-mode: both;">
                        <div class="flex items-center justify-center space-x-4 text-xs text-surface-500 dark:text-surface-400">
                            <div class="flex items-center">
                                <i class="pi pi-shield text-green-500 mr-2"></i>
                                <span>SSL Secured</span>
                            </div>
                            <div class="flex items-center">
                                <i class="pi pi-clock text-blue-500 mr-2"></i>
                                <span>24/7 Support</span>
                            </div>
                            <div class="flex items-center">
                                <i class="pi pi-mobile text-purple-500 mr-2"></i>
                                <span>Mobile Ready</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Login implements OnInit {

    private authService = inject(AuthService);
    private router = inject(Router);
    private messageService = inject(MessageService);
    private cryptoJsService = inject(CryptoJsService);


    username: string = '';
    password: string = '';
    rememberMe: boolean = false;
    loading: boolean = false;

    ngOnInit(): void {
        // guest token
        this.authService.getInitialToken().subscribe({
        error: () => {
            this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to initialize login. Please refresh the page.',
            life: 3000
            });
        }
        });
    }

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

  const encryptedPassword =
    this.cryptoJsService.encryptPassword(this.password);

  this.authService.login(
    this.username,
    encryptedPassword,
    this.rememberMe
  ).subscribe({

    next: () => {
      this.loading = false;

      this.messageService.add({
        severity: 'success',
        summary: 'Login Successful',
        detail: 'Welcome back!',
        life: 2000
      });

      this.router.navigate(['/dashboard']);
    },

    error: () => {
      this.loading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Invalid username or password',
        life: 3000
      });
    }
  });
}

}

