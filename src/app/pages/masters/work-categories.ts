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

interface TenderType {
  id: number;
  name: string;
}

interface WorkType {
  id: number;
  tenderTypeId: number;
  name: string;
}

interface SubWorkType {
  id: number;
  workTypeId: number;
  workTypeName: string;
  name: string;
}

@Component({
  selector: 'app-work-type-master',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
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

<div class="min-h-screen bg-[var(--surface-ground)] p-6 md:p-10 transition-colors duration-300">
    
    <div class="bg-[var(--surface-card)] rounded-[40px] p-8 mb-4 shadow-sm border border-[var(--surface-border)] flex flex-col items-center justify-center text-center">
        <div class="w-10 h-10 flex items-center justify-center mb-1">
            <i class="pi pi-briefcase text-[var(--primary-color)] text-xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-[var(--text-color)] tracking-tight leading-none mb-3">Work Type Management</h1>
        <p class="text-[var(--text-color-secondary)] text-sm font-medium">Manage tender categories, work types, and sub-work associations.</p>
    </div>

    <div class="bg-[var(--surface-card)] rounded-[40px] p-10 mb-2 shadow-sm border border-[var(--surface-border)] flex flex-col items-center justify-center text-center">
        <div class="w-10 h-1 bg-[var(--primary-color)] mx-auto rounded-full mb-4"></div>
        <h2 class="text-2xl font-black text-[var(--text-color)] tracking-tight mb-6">Select Tender Type</h2>
        
        <div class="w-full max-w-md">
          <select class="premium-select-input shadow-sm" [(ngModel)]="selectedTenderId" (change)="onTenderChange()">
            <option [ngValue]="null">-- Choose Tender Type --</option>
            <option *ngFor="let t of tenderTypes" [ngValue]="t.id">{{ t.name }}</option>
          </select>
        </div>
    </div>

    <div *ngIf="!selectedTenderId" class="flex flex-col items-center justify-center py-16 opacity-40">
        <i class="pi pi-filter-slash text-5xl text-[var(--text-color-secondary)] mb-3"></i>
        <p class="text-[var(--text-color-secondary)] font-bold uppercase tracking-[0.2em] text-[10px]">Select a category above to load data</p>
    </div>

    <div *ngIf="selectedTenderId" class="space-y-4 animate-fadein">
        
        <div class="bg-[var(--surface-card)] rounded-[48px] p-8 md:p-10 shadow-sm border border-[var(--surface-border)]">
            <div class="flex flex-col items-center mb-8">
                <h2 class="text-2xl font-black text-[var(--text-color)] tracking-tight">Work Types</h2>
                <div class="flex gap-3 mt-6">
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search"></p-inputicon>
                        <input pInputText placeholder="Search work type..." (input)="onWorkTypeSearch($event)" 
                               class="w-full !rounded-2xl !bg-[var(--surface-50)] !border-[var(--surface-border)] !py-3 !font-bold !text-[var(--text-color)]">
                    </p-iconfield>
                    <button pButton label="Add Work Type" icon="pi pi-plus" 
                            class="bg-[var(--primary-color)] border-none !rounded-xl px-6 text-[var(--primary-color-text)] font-bold" 
                            (click)="openAddWorkType()"></button>
                </div>
            </div>

            <p-table [value]="filteredWorkTypes" [rows]="5" [paginator]="true">
                <ng-template #header>
                    <tr class="border-b border-[var(--surface-border)]">
                        <th class="table-header-text text-left">Work Category Name</th>
                        <th style="text-align:right;" class="table-header-text">Actions</th>
                    </tr>
                </ng-template>
                <ng-template #body let-item>
                    <tr class="border-b border-[var(--surface-border)] last:border-0 hover:bg-[var(--surface-hover)]">
                        <td class="font-bold text-[var(--text-color)] py-4">{{ item.name }}</td>
                        <td style="text-align:right;">
                            <button pButton icon="pi pi-pencil" class="p-button-text p-button-sm mr-2 text-[var(--primary-color)]" (click)="openEditWorkType(item)"></button>
                            <button pButton icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm" (click)="confirmDeleteWorkType(item.id)"></button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>

        <div class="bg-[var(--surface-card)] rounded-[48px] p-8 md:p-10 shadow-sm border border-[var(--surface-border)]">
            <div class="flex flex-col items-center mb-8">
                <h2 class="text-2xl font-black text-[var(--text-color)] tracking-tight">Sub Work Types</h2>
                <div class="flex gap-3 mt-6 flex-wrap justify-center">
                    <select class="premium-select-input-sm w-48" [(ngModel)]="selectedWorkTypeId" (change)="refreshSubWorkTypes()">
                        <option [ngValue]="null">Filter by Work Type</option>
                        <option *ngFor="let w of workTypesForSelectedTender" [ngValue]="w.id">{{ w.name }}</option>
                    </select>
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search"></p-inputicon>
                        <input pInputText placeholder="Search sub work..." (input)="onSubWorkTypeSearch($event)" 
                               class="w-full !rounded-2xl !bg-[var(--surface-50)] !border-[var(--surface-border)] !py-3 !font-bold !text-[var(--text-color)]">
                    </p-iconfield>
                    <button pButton label="Add Sub Work" icon="pi pi-plus" 
                            class="bg-[var(--primary-color)] border-none !rounded-xl px-6 text-[var(--primary-color-text)] font-bold" 
                            [disabled]="!selectedWorkTypeId" (click)="openAddSubWorkType()"></button>
                </div>
            </div>

            <p-table [value]="filteredSubWorkTypes" [rows]="5" [paginator]="true">
                <ng-template #header>
                    <tr class="border-b border-[var(--surface-border)]">
                        <th class="table-header-text text-left">Parent Category</th>
                        <th class="table-header-text text-left">Sub Work Name</th>
                        <th style="text-align:right;" class="table-header-text">Actions</th>
                    </tr>
                </ng-template>
                <ng-template #body let-item>
                    <tr class="border-b border-[var(--surface-border)] last:border-0 hover:bg-[var(--surface-hover)]">
                        <td class="py-4"><span class="status-badge">{{ item.workTypeName }}</span></td>
                        <td class="font-bold text-[var(--text-color)] py-4">{{ item.name }}</td>
                        <td style="text-align:right;">
                            <button pButton icon="pi pi-pencil" class="p-button-text p-button-sm mr-2 text-[var(--primary-color)]" (click)="openEditSubWorkType(item)"></button>
                            <button pButton icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm" (click)="confirmDeleteSubWorkType(item.id)"></button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    </div>
</div>

<p-dialog [header]="isEditWorkType ? 'Edit Work Type' : 'Add Work Type'" [(visible)]="showWorkTypeDialog" [modal]="true" [style]="{width:'400px'}">
    <form [formGroup]="workTypeForm" class="flex flex-col gap-4 py-4">
        <div class="flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-widest ml-1">Work Type Name</label>
            <input pInputText placeholder="e.g. Electrical Main" formControlName="name" 
                   class="!rounded-xl !p-4 !bg-[var(--surface-50)] !font-bold !text-[var(--text-color)] !border-[var(--surface-border)]">
        </div>
        <div class="flex justify-end gap-2 mt-4">
            <button pButton label="Cancel" class="p-button-text p-button-secondary" (click)="showWorkTypeDialog=false"></button>
            <button pButton label="Save Entry" class="bg-[var(--primary-color)] border-none !rounded-xl px-8 text-[var(--primary-color-text)] font-bold shadow-2" [disabled]="workTypeForm.invalid" (click)="saveWorkType()"></button>
        </div>
    </form>
</p-dialog>

<p-dialog [header]="isEditSubWorkType ? 'Edit Sub Work Type' : 'Add Sub Work Type'" [(visible)]="showSubWorkTypeDialog" [modal]="true" [style]="{width:'400px'}">
    <form [formGroup]="subWorkTypeForm" class="flex flex-col gap-4 py-4">
        <div class="flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-widest ml-1">Parent Category</label>
            <select class="premium-select-input-sm !p-3 !bg-[var(--surface-50)] !text-[var(--text-color)]" formControlName="workTypeId">
                <option [ngValue]="null">Select Work Type</option>
                <option *ngFor="let w of workTypesForSelectedTender" [ngValue]="w.id">{{ w.name }}</option>
            </select>
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-widest ml-1">Sub Work Name</label>
            <input pInputText placeholder="e.g. Panel Installation" formControlName="name" 
                   class="!rounded-xl !p-4 !bg-[var(--surface-50)] !font-bold !text-[var(--text-color)] !border-[var(--surface-border)]">
        </div>
        <div class="flex justify-end gap-2 mt-4">
            <button pButton label="Cancel" class="p-button-text p-button-secondary" (click)="showSubWorkTypeDialog=false"></button>
            <button pButton label="Save Sub Entry" class="bg-[var(--primary-color)] border-none !rounded-xl px-8 text-[var(--primary-color-text)] font-bold shadow-2" [disabled]="subWorkTypeForm.invalid" (click)="saveSubWorkType()"></button>
        </div>
    </form>
</p-dialog>
`,
  styles: [`
    .premium-select-input {
      width: 100%; border-radius: 14px; border: 1.5px solid var(--surface-border);
      padding: 0.8rem 1.1rem; font-size: 14px; font-weight: 700;
      background: var(--surface-50); color: var(--text-color); outline: none; transition: all 0.2s;
    }
    .premium-select-input:focus { border-color: var(--primary-color); background: var(--surface-card); }
    
    .premium-select-input-sm {
      border-radius: 12px; border: 1.5px solid var(--surface-border); padding: 0.5rem 1rem;
      font-size: 13px; font-weight: 700; background: var(--surface-ground); color: var(--text-color); outline: none;
    }

    .table-header-text {
      font-size: 11px !important; font-weight: 900 !important; color: var(--text-color-secondary) !important;
      text-transform: uppercase !important; letter-spacing: 0.15em !important; padding: 1rem !important;
      background: transparent !important; border: none !important;
    }

    .status-badge {
      padding: 4px 12px; background: var(--surface-100); border-radius: 20px;
      font-size: 10px; font-weight: 800; color: var(--text-color-secondary); text-transform: uppercase;
      border: 1px solid var(--surface-border);
    }
    :host ::ng-deep .p-paginator {
      justify-content: center !important; border: none !important; padding-top: 2rem !important;
      background: transparent !important;
    }
    :host ::ng-deep .p-paginator-page.p-highlight {
      background: var(--primary-color) !important; color: var(--primary-color-text) !important; 
      font-weight: 900 !important; border-radius: 50% !important;
    }
  `]
})
export class WorkTypeMaster {
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  tenderTypes: TenderType[] = [
    { id: 1, name: 'Civil' },
    { id: 2, name: 'Electrical' },
    { id: 3, name: 'Mechanical' }
  ];

  allWorkTypes: WorkType[] = [
    { id: 1, tenderTypeId: 1, name: 'Road Construction' },
    { id: 2, tenderTypeId: 1, name: 'Civil Building' },
    { id: 3, tenderTypeId: 2, name: 'Internal Wiring' }
  ];

  allSubWorkTypes: SubWorkType[] = [
    { id: 1, workTypeId: 1, workTypeName: 'Road Construction', name: 'Bitumen Layer' }
  ];

  selectedTenderId: number | null = null;
  selectedWorkTypeId: number | null = null;

  filteredWorkTypes: WorkType[] = [];
  filteredSubWorkTypes: SubWorkType[] = [];
  workTypesForSelectedTender: WorkType[] = [];

  showWorkTypeDialog = false;
  showSubWorkTypeDialog = false;
  isEditWorkType = false;
  isEditSubWorkType = false;

  editWorkTypeId: number | null = null;
  editSubWorkTypeId: number | null = null;

  workTypeForm: FormGroup = this.fb.group({ name: [null, Validators.required] });
  subWorkTypeForm: FormGroup = this.fb.group({ workTypeId: [null, Validators.required], name: [null, Validators.required] });

  onTenderChange() {
    this.selectedWorkTypeId = null;
    this.refresh();
  }

  refresh() {
    if (this.selectedTenderId) {
      this.workTypesForSelectedTender = this.allWorkTypes.filter(w => w.tenderTypeId === this.selectedTenderId);
      this.filteredWorkTypes = [...this.workTypesForSelectedTender];
      this.refreshSubWorkTypes();
    }
  }

  refreshSubWorkTypes() {
    if (this.selectedWorkTypeId) {
      this.filteredSubWorkTypes = this.allSubWorkTypes.filter(s => s.workTypeId === this.selectedWorkTypeId);
    } else {
      const tenderWorkIds = this.workTypesForSelectedTender.map(w => w.id);
      this.filteredSubWorkTypes = this.allSubWorkTypes.filter(s => tenderWorkIds.includes(s.workTypeId));
    }
  }

  onWorkTypeSearch(e: any) {
    const q = e.target.value.toLowerCase();
    this.filteredWorkTypes = this.workTypesForSelectedTender.filter(w => w.name.toLowerCase().includes(q));
  }

  onSubWorkTypeSearch(e: any) {
    const q = e.target.value.toLowerCase();
    this.filteredSubWorkTypes = this.allSubWorkTypes.filter(s => 
      s.name.toLowerCase().includes(q) && (this.selectedWorkTypeId ? s.workTypeId === this.selectedWorkTypeId : true)
    );
  }

  openAddWorkType() { this.isEditWorkType = false; this.workTypeForm.reset(); this.showWorkTypeDialog = true; }
  openEditWorkType(w: WorkType) { this.isEditWorkType = true; this.editWorkTypeId = w.id; this.workTypeForm.patchValue({ name: w.name }); this.showWorkTypeDialog = true; }

  saveWorkType() {
    const name = this.workTypeForm.value.name;
    if (this.isEditWorkType) {
      const i = this.allWorkTypes.findIndex(w => w.id === this.editWorkTypeId);
      if (i !== -1) this.allWorkTypes[i].name = name;
    } else {
      this.allWorkTypes.unshift({ id: Date.now(), tenderTypeId: this.selectedTenderId!, name });
    }
    this.refresh();
    this.showWorkTypeDialog = false;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Work Type saved' });
  }

  confirmDeleteWorkType(id: number) {
    this.confirmationService.confirm({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this work type?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.allWorkTypes = this.allWorkTypes.filter(w => w.id !== id);
        this.allSubWorkTypes = this.allSubWorkTypes.filter(s => s.workTypeId !== id);
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Work type removed' });
      }
    });
  }

  openAddSubWorkType() { this.isEditSubWorkType = false; this.subWorkTypeForm.reset(); this.subWorkTypeForm.patchValue({ workTypeId: this.selectedWorkTypeId }); this.showSubWorkTypeDialog = true; }
  openEditSubWorkType(s: SubWorkType) { this.isEditSubWorkType = true; this.editSubWorkTypeId = s.id; this.subWorkTypeForm.patchValue({ workTypeId: s.workTypeId, name: s.name }); this.showSubWorkTypeDialog = true; }

  saveSubWorkType() {
    const workTypeId = Number(this.subWorkTypeForm.value.workTypeId);
    const name = this.subWorkTypeForm.value.name;
    const wt = this.allWorkTypes.find(w => w.id === workTypeId);
    if (this.isEditSubWorkType) {
      const i = this.allSubWorkTypes.findIndex(s => s.id === this.editSubWorkTypeId);
      if (i !== -1) this.allSubWorkTypes[i] = { id: this.editSubWorkTypeId!, workTypeId, workTypeName: wt!.name, name };
    } else {
      this.allSubWorkTypes.unshift({ id: Date.now(), workTypeId, workTypeName: wt!.name, name });
    }
    this.refreshSubWorkTypes();
    this.showSubWorkTypeDialog = false;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sub work type saved' });
  }

  confirmDeleteSubWorkType(id: number) {
    this.confirmationService.confirm({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this sub work type?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.allSubWorkTypes = this.allSubWorkTypes.filter(s => s.id !== id);
        this.refreshSubWorkTypes();
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Sub work removed' });
      }
    });
  }
}