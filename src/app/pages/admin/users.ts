import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select'; 
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// Services
import { AdminService } from '../../layout/service/admin.service';

@Component({
  selector: 'app-users',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    HttpClientModule,
    InputTextModule, 
    SelectModule,
    ButtonModule, 
    ToastModule
  ],
  template: `
    <p-toast position="top-right"></p-toast>

    <div class="min-h-screen bg-[var(--surface-ground)] p-6 md:p-10 transition-colors duration-300">
        
        <div class="bg-[var(--surface-card)] rounded-[40px] p-6 mb-2 shadow-sm border border-[var(--surface-border)] flex flex-col items-center justify-center text-center">
            <div class="w-10 h-10 flex items-center justify-center mb-1">
               <i class="pi pi-user text-[var(--primary-color)] text-xl"></i>
            </div>
            <h1 class="text-3xl font-bold text-[var(--text-color)] tracking-tight leading-none mb-3 font-bold">User Management</h1>
            <p class="text-[var(--text-color-secondary)] text-sm font-medium tracking-tight font-bold">Manage user accounts and system access authority.</p>
        </div>

        <div class="bg-[var(--surface-card)] rounded-[48px] p-8 md:p-10 shadow-sm border border-[var(--surface-border)]">
            <form [formGroup]="userForm">
              
              <div class="text-center mb-10">
                <div class="w-10 h-1 bg-[var(--primary-color)] mx-auto rounded-full mb-4"></div>
                <h2 class="text-2xl font-black text-[var(--text-color)] tracking-tight">Add New User</h2>
              </div>

              <div class="grid grid-cols-12 gap-x-8 gap-y-10 px-4">
                
                <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
                  <label class="label-style">User ID</label>
                  <input pInputText formControlName="userId" class="premium-input" placeholder="e.g. EMP101" />
                </div>

                <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
                  <label class="label-style">Full Name</label>
                  <input pInputText formControlName="name" class="premium-input" placeholder="Enter name" />
                </div>

                <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
                  <label class="label-style">Email Address</label>
                  <input pInputText formControlName="email" class="premium-input" placeholder="example@useremail.com" />
                </div>

                <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
                  <label class="label-style">Mobile Number</label>
                  <input pInputText formControlName="mobile" class="premium-input" placeholder="10-digit number" />
                </div>

                <div class="col-span-12 md:col-span-6 flex flex-col gap-2">
                  <label class="label-style">Authority Role</label>
                  <p-select 
                    [options]="roles" 
                    formControlName="roleId" 
                    optionLabel="Name" 
                    optionValue="RoleID" 
                    placeholder="Select Role" 
                    styleClass="premium-dropdown" 
                    class="w-full">
                  </p-select>
                </div>

              </div>

              <div class="flex justify-center mt-12">
                <button pButton type="button" (click)="onSubmit()"
                        class="!bg-[var(--primary-color)] !border-none px-16 py-3.5 rounded-[14px] font-bold uppercase tracking-wide shadow-lg hover:shadow-xl transition-all active:scale-95 text-[var(--primary-color-text)]">
                  {{ loading ? 'Saving...' : 'Add User to System' }}
                </button>
              </div>

            </form>
        </div>
    </div>
  `,
  styles: [`
    .premium-input {
      border-radius: 14px !important;
      border: 1.5px solid var(--surface-border) !important;
      padding: 0.8rem 1.1rem !important;
      font-size: 14px !important;
      font-weight: 700 !important;
      background: var(--surface-50) !important;
      color: var(--text-color) !important;
      width: 100% !important;
      transition: all 0.2s ease;
    }
    .premium-input:focus {
      border-color: var(--primary-color) !important;
      background: var(--surface-card) !important;
      box-shadow: 0 0 0 1px var(--primary-color) !important;
    }
    .label-style {
      font-size: 10px;
      font-weight: 900;
      color: var(--text-color-secondary);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      margin-left: 0.125rem;
    }
    :host ::ng-deep .premium-dropdown {
      border-radius: 14px !important;
      border: 1.5px solid var(--surface-border) !important;
      background: var(--surface-50) !important;
      width: 100% !important;
    }
    :host ::ng-deep .p-select-label {
      padding: 0.8rem 1.1rem !important;
      font-weight: 700 !important;
      color: var(--text-color) !important;
    }
  `]
})
export class Users implements OnInit {
  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  private messageService = inject(MessageService);
  private cdr = inject(ChangeDetectorRef);

  userForm!: FormGroup;
  loading = false;
  roles: any[] = []; 

  ngOnInit() {
    this.initForm();
    this.fetchRoles(); 
  }

  initForm() {
    this.userForm = this.fb.group({
      userId: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      roleId: [null, Validators.required]
    });
  }

  fetchRoles() {
    this.adminService.getRoles().subscribe({
      next: (res) => {
        this.roles = res;
        this.cdr.markForCheck(); 
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not load roles' });
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loading = true;
      this.adminService.addNewUser(this.userForm.value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Added Successfully' });
          this.userForm.reset();
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save' });
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
    }
  }
}