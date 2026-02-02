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

interface Machinery {
  id: number;
  name: string;
  capacity: string;
  network_ID?: string;
  terminal_ID?: string;
}

@Component({
  selector: 'app-machinary',
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
      <h2 class="text-2xl font-semibold m-0" style="margin:1rem;">Machinery Master</h2>

      <div style="display:flex;gap:15px;flex-wrap:wrap;justify-content:center;">
        <p-iconfield>
          <p-inputicon styleClass="pi pi-search"></p-inputicon>
          <input
            pInputText
            placeholder="Search machinery..."
            style="width:200px;"
            (input)="onSearch($event)">
        </p-iconfield>

        <button
          pButton
          label="Add Machinery"
          icon="pi pi-plus"
          class="p-button-success"
          style="width:200px;"
          (click)="openAddDialog()">
        </button>
      </div>
    </div>

    <!-- TABLE -->
    <p-table
      [value]="filteredMachineries"
      [paginator]="true"
      [rows]="10"
      responsiveLayout="scroll">

      <ng-template #header>
        <tr>
          <th>Machinery Name</th>
          <th>Capacity</th>
          <th style="text-align:right;">Actions</th>
        </tr>
      </ng-template>

      <ng-template #body let-item>
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.capacity }}</td>
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
    [header]="isEditMode ? 'Edit Machinery' : 'Add Machinery'"
    [(visible)]="showDialog"
    [modal]="true"
    [style]="{width:'400px'}"
    [draggable]="false">

    <form [formGroup]="form" class="flex flex-col gap-3">

      <div>
        <label class="text-sm font-semibold">Machinery Name</label>
        <input pInputText formControlName="name" class="w-full">
      </div>

      <div>
        <label class="text-sm font-semibold">Capacity</label>
        <input pInputText formControlName="capacity" class="w-full">
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
          [loading]="loading"
          [disabled]="form.invalid || loading"
          (click)="saveMachinery()">
        </button>
      </div>

    </form>
  </p-dialog>
  `
})
export class Machinary {

  showDialog = false;
  loading = false;
  isEditMode = false;
  selectedMachineryId: number | null = null;

  // ===== MASTER DATA =====
  machineries: Machinery[] = [
    { id: 1, name: 'Excavator', capacity: '1.2 m³' },
    { id: 2, name: 'Crane', capacity: '20 Ton' },
    { id: 3, name: 'Concrete Mixer', capacity: '500 Ltr' }
  ];

  // ===== FILTERED TABLE DATA =====
  filteredMachineries: Machinery[] = [];

  // ===== TYPED FORM =====
  form!: FormGroup<{
    name: FormControl<string | null>;
    capacity: FormControl<string | null>;
  }>;

  constructor(
    private fb: FormBuilder,
    private adminApi: AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.form = this.fb.group({
      name: this.fb.control<string | null>(null, Validators.required),
      capacity: this.fb.control<string | null>(null, Validators.required)
    });

    // 🔥 INIT FILTER
    this.filteredMachineries = [...this.machineries];
  }

  // ===== SEARCH =====
  onSearch(event: Event) {
    const q = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredMachineries = this.machineries.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.capacity.toLowerCase().includes(q)
    );
  }

  // ===== ADD =====
  openAddDialog() {
    this.isEditMode = false;
    this.selectedMachineryId = null;
    this.form.reset();
    this.showDialog = true;
  }

  // ===== EDIT =====
  openEditDialog(item: Machinery) {
    this.isEditMode = true;
    this.selectedMachineryId = item.id;

    this.form.patchValue({
      name: item.name,
      capacity: item.capacity
    });

    this.showDialog = true;
  }

  // ===== SAVE (ADD / UPDATE) =====
  saveMachinery() {

    const payload = {
      id: this.selectedMachineryId,
      name: this.form.value.name!,
      capacity: this.form.value.capacity!,
      network_ID: 'WEB',
      terminal_ID: 'ADMIN'
    };

    this.loading = true;

    if (this.isEditMode) {

      const index = this.machineries.findIndex(
        m => m.id === this.selectedMachineryId
      );

      if (index !== -1) {
        this.machineries[index] = {
          id: this.selectedMachineryId!,
          name: payload.name,
          capacity: payload.capacity
        };
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Updated',
        detail: 'Machinery updated successfully'
      });

      // ❌ API (later)
      // this.adminApi.updateMachinery(payload).subscribe();

    } else {

      this.machineries.unshift({
        id: Date.now(),
        name: payload.name,
        capacity: payload.capacity
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Machinery added successfully'
      });

      // ❌ API (later)
      // this.adminApi.addMachinery(payload).subscribe();
    }

    // 🔁 REFRESH FILTERED LIST
    this.filteredMachineries = [...this.machineries];

    this.loading = false;
    this.showDialog = false;
    this.form.reset();
  }

  // ===== DELETE (STANDARD – SAME AS MANPOWER) =====
  confirmDelete(id: number) {

    this.confirmationService.confirm({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this machinery?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptLabel: 'Yes, Delete',
      rejectLabel: 'Cancel',

      accept: () => {

        this.machineries = this.machineries.filter(m => m.id !== id);
        this.filteredMachineries = [...this.machineries];

        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Machinery deleted successfully'
        });

        // ❌ API (later)
        // this.adminApi.deleteMachinery({ id, network_ID:'WEB', terminal_ID:'ADMIN' }).subscribe();
      }
    });
  }
}
