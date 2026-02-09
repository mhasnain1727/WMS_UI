import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

// Services
import { AdminService } from '../../layout/service/admin.service';

interface ManpowerItems {
  Id: number;
  Role: string;
  Grade: string;
}

@Component({
  selector: 'app-manpower',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  template: `
    <p-toast></p-toast>
    
    <p-confirmDialog #cd>
      <ng-template #footer>
        <button type="button" pButton label="Cancel" class="p-button-text p-button-secondary p-button-sm mr-2" (click)="cd.onReject()"></button>
        <button type="button" pButton label="Delete" class="p-button-danger p-button-sm rounded-lg px-4" (click)="cd.onAccept()"></button>
      </ng-template>
    </p-confirmDialog>

    <div class="min-h-screen bg-[var(--surface-ground)] p-6 md:p-10 flex flex-col items-center transition-colors duration-300">
      <div class="w-full max-w-6xl space-y-4">
        
        <div class="bg-[var(--surface-card)] rounded-[40px] p-8 shadow-sm border border-[var(--surface-border)] text-center">
          <div class="w-10 h-10 flex items-center justify-center mx-auto mb-1">
             <i class="pi pi-users text-xl text-[var(--primary-color)]"></i>
          </div>
          <h1 class="text-3xl font-bold text-[var(--text-color)] tracking-tight leading-none mb-3 font-bold">Manpower Master</h1>
          <p class="text-[var(--text-color-secondary)] text-sm font-medium tracking-tight font-bold">Manage workforce roles, designations, and grade classifications.</p>
        </div>

        <div class="bg-[var(--surface-card)] rounded-[48px] p-8 md:p-12 shadow-sm border border-[var(--surface-border)]">
          
          <div class="flex flex-col items-center mb-10 text-center">
            <div class="w-12 h-1.5 bg-[var(--primary-color)] rounded-full mb-6"></div>
            <h2 class="text-3xl font-black text-[var(--text-color)] tracking-tight mb-8">Workforce Overview</h2>
            
            <div class="flex gap-4 flex-wrap justify-center w-full max-w-2xl">
              <p-iconfield class="w-full md:w-80">
                <p-inputicon styleClass="pi pi-search"></p-inputicon>
                <input pInputText placeholder="Search manpower..." (input)="onSearch($event)" 
                       class="w-full !rounded-2xl !bg-[var(--surface-50)] !border-[var(--surface-border)] !py-3.5 !font-bold !text-[var(--text-color)]">
              </p-iconfield>
              
              <button pButton label="Add Manpower" icon="pi pi-plus" 
                      class="!bg-[var(--primary-color)] !border-none !rounded-2xl px-8 shadow-md font-bold transition-transform active:scale-95 text-[var(--primary-color-text)]" 
                      (click)="openAddDialog()">
              </button>
            </div>
          </div>

          <p-table [value]="filteredManpowers" [paginator]="true" [rows]="10" responsiveLayout="scroll">
            <ng-template #header>
              <tr class="border-b border-[var(--surface-border)]">
                <th class="table-header-style text-left" style="width: 46%;">Role / Designation</th>
                <th class="table-header-style text-center" style="width: 42%;">Grade</th>
                <th class="table-header-style text-right" style="width: 8%;">Actions</th>
              </tr>
            </ng-template>
            <ng-template #body let-item>
              <tr class="hover:bg-[var(--surface-hover)] transition-colors border-b border-[var(--surface-border)] last:border-0">
                <td class="py-6 font-bold text-[var(--text-color)] text-lg text-left">{{ item.Role }}</td>
                <td class="py-6 text-center">
                  <span class="grade-pill">{{ item.Grade }}</span>
                </td>
                <td class="py-6 text-right whitespace-nowrap">
                  <div class="flex justify-end gap-3">
                    <button pButton icon="pi pi-pencil" class="p-button-text p-button-sm text-[var(--primary-color)]" (click)="openEditDialog(item)"></button>
                    <button pButton icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm" (click)="confirmDelete(item.Id)"></button>
                  </div>
                </td>
              </tr>
            </ng-template>
          </p-table>
        </div>
      </div>
    </div>

    <p-dialog [header]="isEditMode ? 'Edit Manpower' : 'Add Manpower'" [(visible)]="showDialog" [modal]="true" [style]="{width:'450px'}" styleClass="premium-dialog">
      <form [formGroup]="form" class="flex flex-col gap-6 py-6">
        <div class="flex flex-col gap-2">
          <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-widest ml-1 font-bold">Role / Designation</label>
          <input pInputText placeholder="Enter role" formControlName="role" class="!rounded-2xl !p-4 !bg-[var(--surface-50)] !font-bold !text-[var(--text-color)]">
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-widest ml-1 font-bold">Grade Classification</label>
          <input pInputText placeholder="Enter grade" formControlName="grade" class="!rounded-2xl !p-4 !bg-[var(--surface-50)] !font-bold !text-[var(--text-color)]">
        </div>
        <div class="flex justify-end gap-3 mt-6">
          <button pButton label="Cancel" class="p-button-text p-button-secondary font-bold" (click)="showDialog=false"></button>
          <button pButton [label]="isEditMode ? 'Update' : 'Confirm Entry'" 
                  class="!bg-[var(--primary-color)] !border-none px-8 !rounded-2xl font-black shadow-md text-[var(--primary-color-text)]" 
                  [disabled]="form.invalid || loading" (click)="saveManpower()">
          </button>
        </div>
      </form>
    </p-dialog>
  `,
  styles: [`
    .table-header-style {
      font-size: 11px !important; font-weight: 900 !important; color: var(--text-color-secondary) !important;
      text-transform: uppercase !important; letter-spacing: 0.2em !important; padding: 1.5rem 1rem !important;
      background: transparent !important; border: none !important;
    }
    .grade-pill {
      padding: 6px 16px; background: var(--surface-100); border-radius: 30px;
      font-size: 11px; font-weight: 900; color: var(--text-color-secondary); text-transform: uppercase;
      letter-spacing: 0.05em; display: inline-block; border: 1px solid var(--surface-border);
    }
    :host ::ng-deep .p-paginator {
      justify-content: center !important; border: none !important; padding-top: 2rem !important;
      background: transparent !important;
    }
    :host ::ng-deep .p-paginator-page.p-highlight {
      background: var(--primary-color) !important; color: var(--primary-color-text) !important; font-weight: 900 !important; border-radius: 50% !important;
    }
  `]
})
export class Manpower implements OnInit {
  private fb = inject(FormBuilder);
  private adminApi = inject(AdminService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  showDialog = false;
  loading = false;
  isEditMode = false;
  selectedManpowerId: number | null = null;
  manpowers: ManpowerItems[] = [];
  filteredManpowers: ManpowerItems[] = [];

  form: FormGroup = this.fb.group({
    role: [null, Validators.required],
    grade: [null, Validators.required]
  });

  ngOnInit() { this.loadData(); }

  loadData() {
    this.adminApi.getManpower().subscribe({
      next: (res: any) => {
        const data = res.data || res;
        this.manpowers = Array.isArray(data) ? data : [];
        this.filteredManpowers = [...this.manpowers];
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Data load failed' })
    });
  }

  onSearch(event: Event) {
    const q = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredManpowers = this.manpowers.filter(m =>
      m.Role?.toLowerCase().includes(q) || m.Grade?.toLowerCase().includes(q)
    );
  }

  openAddDialog() {
    this.isEditMode = false;
    this.selectedManpowerId = null;
    this.form.reset();
    this.showDialog = true;
  }

  openEditDialog(item: ManpowerItems) {
    this.isEditMode = true;
    this.selectedManpowerId = item.Id;
    this.form.patchValue({ role: item.Role, grade: item.Grade });
    this.showDialog = true;
  }

  saveManpower() {
    if (this.form.invalid) return;
    const payload = { role: this.form.value.role, grade: this.form.value.grade, network_ID: 'WEB', terminal_ID: 'ADMIN' };

    if (!this.isEditMode) {
      this.loading = true;
      this.adminApi.addManpower(payload).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Manpower added' });
          this.showDialog = false;
          this.loading = false;
          this.loadData();
        },
        error: () => { this.loading = false; this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Add failed' }); }
      });
    } else {
      const index = this.manpowers.findIndex(m => m.Id === this.selectedManpowerId);
      if (index !== -1) {
        this.manpowers[index] = { Id: this.selectedManpowerId!, Role: payload.role!, Grade: payload.grade! };
        this.filteredManpowers = [...this.manpowers];
      }
      this.showDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated locally' });
    }
  }

  confirmDelete(id: number) {
    this.confirmationService.confirm({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this manpower?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.manpowers = this.manpowers.filter(m => m.Id !== id);
        this.filteredManpowers = [...this.manpowers];
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Removed from list' });
      }
    });
  }
}