import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

import { AdminService } from '../../layout/service/admin.service';

interface ManpowerItems {
  id: number;
  role: string;
  grade: string;
}

@Component({
  selector: 'app-manpower',
  standalone: true,
  imports: [
    CommonModule,
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
  <p-confirmDialog></p-confirmDialog>

  <div class="card" style="padding:1rem;">

    <!-- HEADER -->
    <div style="display:flex;flex-direction:column;align-items:center;margin-bottom:1rem;">
      <h2 class="text-2xl font-semibold m-0" style="margin:1rem;">Manpower Master</h2>

      <div style="display:flex;gap:15px;flex-wrap:wrap;justify-content:center;">
        <p-iconfield>
          <p-inputicon styleClass="pi pi-search"></p-inputicon>
          <input
            pInputText
            placeholder="Search manpower..."
            style="width:200px;"
            (input)="onSearch($event)">
        </p-iconfield>

        <button
          pButton
          label="Add Manpower"
          icon="pi pi-plus"
          class="p-button-success"
          style="width:200px;"
          (click)="openAddDialog()">
        </button>
      </div>
    </div>

    <!-- TABLE -->
    <p-table
      [value]="filteredManpowers"
      [paginator]="true"
      [rows]="10"
      responsiveLayout="scroll">

      <ng-template #header>
        <tr>
          <th>Role</th>
          <th>Grade</th>
          <th style="text-align:right;">Actions</th>
        </tr>
      </ng-template>

      <ng-template #body let-item>
        <tr>
          <td>{{ item.role }}</td>
          <td>{{ item.grade }}</td>
          <td style="text-align:right;white-space:nowrap;">

            <!-- EDIT -->
            <button
              pButton
              icon="pi pi-pencil"
              class="p-button-text p-button-sm mr-3"
              (click)="openEditDialog(item)">
            </button>

            <!-- DELETE -->
            <button
              pButton
              icon="pi pi-trash"
              class="p-button-text p-button-danger p-button-sm"
              (click)="confirmDelete(item.id)">
            </button>

          </td>
        </tr>
      </ng-template>

    </p-table>
  </div>

  <!-- ADD / EDIT DIALOG -->
  <p-dialog
    [header]="isEditMode ? 'Edit Manpower' : 'Add Manpower'"
    [(visible)]="showDialog"
    [modal]="true"
    [style]="{width:'400px'}">

    <form [formGroup]="form" class="flex flex-col gap-3">

      <div>
        <label class="text-sm font-semibold">Role</label>
        <input pInputText formControlName="role" class="w-full">
      </div>

      <div>
        <label class="text-sm font-semibold">Grade</label>
        <input pInputText formControlName="grade" class="w-full">
      </div>

      <div class="flex justify-content-end gap-2 mt-3">
        <button
          pButton
          label="Cancel"
          severity="secondary"
          type="button"
          (click)="showDialog=false">
        </button>

        <button
          pButton
          [label]="isEditMode ? 'Update' : 'Save'"
          type="button"
          [disabled]="form.invalid || loading"
          [loading]="loading"
          (click)="saveManpower()">
        </button>
      </div>

    </form>
  </p-dialog>
  `
})
export class Manpower {

  showDialog = false;
  loading = false;
  isEditMode = false;
  selectedManpowerId: number | null = null;

  // ===== MASTER DATA =====
  manpowers: ManpowerItems[] = [
    { id: 1, role: 'Electrician', grade: 'Skilled' },
    { id: 2, role: 'Welder', grade: 'Skilled' },
    { id: 3, role: 'Mason', grade: 'Highly Skilled' },
    { id: 4, role: 'Helper', grade: 'Unskilled' }
  ];

  // ===== FILTERED TABLE DATA =====
  filteredManpowers: ManpowerItems[] = [];

  // ===== TYPED FORM =====
  form!: FormGroup<{
    role: FormControl<string | null>;
    grade: FormControl<string | null>;
  }>;

  constructor(
    private fb: FormBuilder,
    private adminApi: AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.form = this.fb.group({
      role: this.fb.control<string | null>(null, Validators.required),
      grade: this.fb.control<string | null>(null, Validators.required)
    });

    // 🔥 INIT FILTER
    this.filteredManpowers = [...this.manpowers];
  }

  // ===== SEARCH =====
  onSearch(event: Event) {
    const q = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredManpowers = this.manpowers.filter(m =>
      m.role.toLowerCase().includes(q) ||
      m.grade.toLowerCase().includes(q)
    );
  }

  // ===== ADD =====
  openAddDialog() {
    this.isEditMode = false;
    this.selectedManpowerId = null;
    this.form.reset();
    this.showDialog = true;
  }

  // ===== EDIT =====
  openEditDialog(item: ManpowerItems) {
    this.isEditMode = true;
    this.selectedManpowerId = item.id;

    this.form.patchValue({
      role: item.role,
      grade: item.grade
    });

    this.showDialog = true;
  }

  // ===== SAVE (ADD / UPDATE) =====
  saveManpower() {

    const payload = {
      id: this.selectedManpowerId,
      role: this.form.value.role!,
      grade: this.form.value.grade!,
      network_ID: 'WEB',
      terminal_ID: 'ADMIN'
    };

    this.loading = true;

    if (this.isEditMode) {

      const index = this.manpowers.findIndex(
        m => m.id === this.selectedManpowerId
      );

      if (index !== -1) {
        this.manpowers[index] = {
          id: this.selectedManpowerId!,
          role: payload.role,
          grade: payload.grade
        };
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Updated',
        detail: 'Manpower updated successfully'
      });

      // ❌ API (later)
      // this.adminApi.updateManpower(payload).subscribe();

    } else {

      this.manpowers.unshift({
        id: Date.now(),
        role: payload.role,
        grade: payload.grade
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Manpower added successfully'
      });

      // ❌ API (later)
      // this.adminApi.addManpower(payload).subscribe();
    }

    // 🔁 REFRESH FILTER
    this.filteredManpowers = [...this.manpowers];

    this.loading = false;
    this.showDialog = false;
    this.form.reset();
  }

  // ===== DELETE (STANDARD – SAME AS ALL MASTERS) =====
  confirmDelete(id: number) {

    this.confirmationService.confirm({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this manpower?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptLabel: 'Yes, Delete',
      rejectLabel: 'Cancel',

      accept: () => {

        this.manpowers = this.manpowers.filter(m => m.id !== id);
        this.filteredManpowers = [...this.manpowers];

        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Manpower deleted successfully'
        });

        // ❌ API (later)
        // this.adminApi.deleteManpower({ id, network_ID:'WEB', terminal_ID:'ADMIN' }).subscribe();
      }
    });
  }
}
