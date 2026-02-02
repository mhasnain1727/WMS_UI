import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/* PrimeNG */
import { InputText } from 'primeng/inputtext';
import { Button, ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputText,
    Button,
    ButtonDirective
  ],
  styles: [`
    .fade-in {
      animation: fadeIn 0.25s ease-in-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `],
  template: `
  <div class="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100">

    <!-- BACKGROUND BLOBS -->
    <div class="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-40"></div>
    <div class="absolute top-1/2 -right-40 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-40"></div>

    <div class="relative min-h-screen flex">

      <!-- LEFT PANEL -->
      <div class="hidden md:flex w-[35%] relative text-white overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-emerald-700/60"></div>

        <div class="relative z-10 p-10 flex flex-col justify-end h-full">
          <h1 class="text-4xl font-bold mb-2">Work Management System</h1>
          <p class="text-sm text-emerald-100">
            Smart contractor onboarding & execution platform
          </p>
        </div>
      </div>

      <!-- RIGHT PANEL -->
     
      <div class="w-full md:w-[65%] flex flex-col items-center px-6 py-10">

        <!-- OUTER WHITE CARD (HEIGHT INCREASED VIA PADDING) -->
        <div class="w-full max-w-4xl
                  bg-white/70 backdrop-blur-xl
                  rounded-[32px]
                  shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                  border border-white/60
                  px-16 py-25">


          <!-- HEADING -->
          <h2 class="text-5xl font-bold text-center mb-2">
            Create your account
          </h2>

          <p class="text-mid text-gray-600 text-center mb-8">
            Choose how you want to register
          </p>


          <!-- ACCOUNT TYPE CARDS -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto pt-8">


            <!-- CONTRACTOR -->
            <div
              (click)="selectAccountType('CONTRACTOR')"
              class="cursor-pointer rounded-2xl border
                    px-8 py-8 text-center
                    transition-all duration-200
                    hover:shadow-md hover:-translate-y-0.5
                    active:scale-95
                    border-emerald-300 bg-white">

              <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-100
                          flex items-center justify-center">
                <i class="pi pi-user text-xl text-emerald-600"></i>
              </div>

              <h3 class="text-xl font-semibold mb-1">Contractor</h3>
              <p class="text-sm text-gray-500">
                Individual / Labour Contractor
              </p>
            </div>

            <!-- COMPANY -->
            <div
              (click)="selectAccountType('COMPANY')"
              class="cursor-pointer rounded-2xl border
                    px-8 py-8 text-center
                    transition-all duration-200
                    hover:shadow-md hover:-translate-y-0.5
                    active:scale-95
                    border-indigo-300 bg-white">

              <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-indigo-100
                          flex items-center justify-center">
                <i class="pi pi-building text-xl text-indigo-600"></i>
              </div>

              <h3 class="text-xl font-semibold mb-1">Company / Firm</h3>
              <p class="text-sm text-gray-500">
                Pvt Ltd · LLP · Partnership
              </p>
            </div>

          </div>

          <!-- Devider -->
          <div class="w-full max-w-md mx-auto my-5">
            <div class="h-px bg-surface-200 dark:bg-surface-700"></div>
          </div>
          <!-- LOGIN LINK -->
          <div class="mt-8 text-center">
            <p class="text-mid text-gray-500 mb-2">
              <i class="pi pi-info-circle mr-1"></i>
              Already have an account?
            </p>

            <a
              routerLink="/auth/login"
              class="inline-flex items-center gap-2
                    text-primary font-semibold
                    hover:underline text-mid">
              <i class="pi pi-sign-in"></i>
              Login
            </a>
          </div>

        </div>

        <!-- SSL / TRUST STRIP (FIXED POSITION & WIDTH) -->
        <div class="w-full max-w-4xl mt-6">

          <div class="flex items-center justify-center gap-8
                      text-xs text-gray-500">
            <div class="flex items-center gap-2">
              <i class="pi pi-shield text-green-500"></i>
              <span>SSL Secured</span>
            </div>

            <div class="flex items-center gap-2">
              <i class="pi pi-clock text-blue-500"></i>
              <span>24/7 Support</span>
            </div>

            <div class="flex items-center gap-2">
              <i class="pi pi-mobile text-purple-500"></i>
              <span>Mobile Ready</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
  `
})
export class Signup {

  private fb = inject(FormBuilder);

  currentStep = 0;
  accountType: 'CONTRACTOR' | 'COMPANY' | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required],
    password: ['', Validators.required]
  });

  selectAccountType(type: 'CONTRACTOR' | 'COMPANY') {
    this.accountType = type;

    // smooth auto transition
    setTimeout(() => {
      this.currentStep = 1;
    }, 120);
  }
}
