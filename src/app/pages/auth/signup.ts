import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule } from '@angular/router';

/* PrimeNG Modules */
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    PasswordModule
  ],
  styles: [`
    .fade-in { animation: fadeIn 0.3s ease-in-out; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .role-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .role-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }

    /* Input and Password field balance logic */
    :host ::ng-deep .p-float-label { display: block; width: 100%; }
    
    :host ::ng-deep .p-inputtext, 
    :host ::ng-deep .p-password input {
      width: 100% !important;
      height: 44px !important; 
      border-radius: 10px !important;
      font-size: 14px !important;
    }

    :host ::ng-deep .p-password { width: 100%; }

    /* Sirf error text ka style add kiya hai, design nahi badla */
    .error-msg {
      color: #ef4444;
      font-size: 11px;
      margin-top: 4px;
      font-weight: 500;
    }

    :host { display: block; height: 100vh; overflow: hidden; }
  `],
  template: `
  <div class="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100">

    <div class="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-40"></div>
    <div class="absolute top-1/2 -right-40 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-40"></div>

    <div class="relative min-h-screen flex">

      <div class="hidden md:flex w-[35%] relative text-white overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-emerald-700/60"></div>
        <div class="relative z-10 p-10 flex flex-col justify-end h-full">
          <h1 class="text-4xl font-bold mb-2">Work Management System</h1>
          <p class="text-sm text-emerald-100 font-medium">Smart contractor onboarding & execution platform</p>
        </div>
      </div>

      <div class="w-full md:w-[65%] flex flex-col items-center px-6 py-6 justify-center">

        <div class="w-full max-w-4xl bg-white/70 backdrop-blur-xl rounded-[32px]
          shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-white/60 px-8 md:px-16 py-12 relative">

          <button *ngIf="roleSelected" 
                  (click)="roleSelected = false"
                  class="absolute top-8 left-8 text-gray-400 hover:text-emerald-600 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
            <i class="pi pi-arrow-left"></i> Back
          </button>

          <div *ngIf="!roleSelected" class="mb-10 text-center">
            <h2 class="text-5xl font-bold mb-3 tracking-tight">Create your account</h2>
            <p class="text-gray-600 text-lg">Choose how you want to register</p>
          </div>

          <div *ngIf="roleSelected" class="text-center mb-8 fade-in">
            <div class="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center shadow-sm bg-emerald-100 text-emerald-600">
              <i class="pi text-xl" [ngClass]="accountType === 'COMPANY' ? 'pi-building' : 'pi-user'"></i>
            </div>
            <h2 class="text-3xl font-bold tracking-tight">Register as {{ accountType === 'COMPANY' ? 'Company' : 'Contractor' }}</h2>
            <p class="text-gray-500 text-sm mt-1">Please fill in your details to continue</p>
          </div>

          <div *ngIf="!roleSelected" class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto px-4 fade-in">
            <div (click)="selectAccountType('CONTRACTOR')" class="role-card cursor-pointer rounded-2xl border px-8 py-10 text-center bg-white border-emerald-200 hover:border-emerald-400">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                <i class="pi pi-user text-2xl text-emerald-600"></i>
              </div>
              <h3 class="text-xl font-bold">Contractor</h3>
              <p class="text-xs text-gray-400 mt-2 uppercase font-medium">Individual</p>
            </div>

            <div (click)="selectAccountType('COMPANY')" class="role-card cursor-pointer rounded-2xl border px-8 py-10 text-center bg-white border-indigo-200 hover:border-indigo-400">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
                <i class="pi pi-building text-2xl text-indigo-600"></i>
              </div>
              <h3 class="text-xl font-bold">Company / Firm</h3>
              <p class="text-xs text-gray-400 mt-2 uppercase font-medium">Pvt Ltd · LLP</p>
            </div>
          </div>

          <div *ngIf="roleSelected" class="fade-in max-w-2xl mx-auto">
            <form [formGroup]="form" class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              
              <p-float-label>
                <input pInputText id="user" formControlName="username" />
                <label for="user">Username</label>
              </p-float-label>

              <p-float-label>
                <input pInputText type="email" id="email" formControlName="email" />
                <label for="email">Email Address</label>
              </p-float-label>

              <p-float-label>
                <p-password formControlName="password" [toggleMask]="true" [feedback]="false" inputId="p1"></p-password>
                <label for="p1">Password</label>
              </p-float-label>

              <div class="flex flex-col">
                <p-float-label>
                  <p-password formControlName="confirmPassword" [toggleMask]="true" [feedback]="false" inputId="p2"></p-password>
                  <label for="p2">Confirm Password</label>
                </p-float-label>
                <small class="error-msg" *ngIf="form.hasError('mismatch') && form.get('confirmPassword')?.touched">
                  Passwords do not match
                </small>
              </div>

              <div class="md:col-span-2">
                <p-float-label>
                  <input pInputText id="mob" formControlName="mobile" />
                  <label for="mob">Mobile Number</label>
                </p-float-label>
              </div>

              <div class="md:col-span-2 text-center mt-2">
                <button pButton type="button" label="Create Account"
                  class="p-button-rounded p-button-lg w-full bg-emerald-600 hover:bg-emerald-700 border-none shadow-lg py-3.5 font-bold"
                  (click)="submit()">
                </button>
              </div>
            </form>
          </div>

          <div class="mt-8 text-center border-t border-gray-100 pt-6">
            <p class="text-gray-500 text-sm font-medium">Already have an account?
              <a routerLink="/auth/login" class="text-emerald-600 hover:text-emerald-700 font-bold ml-1">Login Now</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
  `
})
export class Signup {
  private fb = inject(FormBuilder);
  roleSelected = false;
  accountType: 'CONTRACTOR' | 'COMPANY' | null = null;

  form = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // 10 digit numeric check
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    roleId: ['']
  }, { validators: this.passwordMatchValidator }); // Validator added here

  // Password Match Function
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  selectAccountType(type: 'CONTRACTOR' | 'COMPANY') {
    this.accountType = type;
    this.roleSelected = true;
    this.form.patchValue({ roleId: type });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log('Working! Payload:', this.form.value);
    }
  }
}