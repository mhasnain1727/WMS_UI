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

interface EquipmentItem {
  id: number;
  toolName: string;
  unit: number;
}

@Component({
  selector: 'app-equipment-master',
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

  <div class="card p-4">

    <!-- TITLE -->
    <div class="flex flex-col items-center mb-4">
      <h2 class="text-2xl font-semibold">Equipments Master</h2>

      <div class="flex gap-[15px] mt-[10px] flex-wrap justify-center">
        <p-iconfield>
          <p-inputicon styleClass="pi pi-search"></p-inputicon>
          <input
            pInputText
            placeholder="Search equipment..."
            style="width:200px"
            (input)="onSearch($event)">
        </p-iconfield>

        <button
          pButton
          label="Add Equipment"
          icon="pi pi-plus"
          class="p-button-success"
          style="width:200px;"
          (click)="openAddDialog()">
        </button>
      </div>
    </div>

    <!-- TABLE -->
    <p-table
      [value]="filteredEquipments"
      [paginator]="true"
      [rows]="10"
      responsiveLayout="scroll">

      <ng-template #header>
        <tr>
          <th>Equipment Name</th>
          <th>Units</th>
          <th style="text-align:right;">Actions</th>
        </tr>
      </ng-template>

      <ng-template #body let-item>
        <tr>
          <td>{{ item.toolName }}</td>
          <td>{{ item.unit }}</td>
          <td style="text-align:right; white-space:nowrap;">
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
    [header]="isEditMode ? 'Edit Equipment' : 'Add Equipment'"
    [(visible)]="showDialog"
    [modal]="true"
    [style]="{ width: '400px' }">

    <form [formGroup]="form" class="flex flex-col gap-3">

      <div>
        <label class="text-sm font-semibold">Tool Name</label>
        <input pInputText formControlName="toolName" class="w-full">
      </div>

      <div>
        <label class="text-sm font-semibold">Unit</label>
        <input type="number" pInputText formControlName="unit" class="w-full">
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
          [disabled]="form.invalid"
          (click)="saveEquipment()">
        </button>
      </div>

    </form>
  </p-dialog>
  `
})
export class EquipmentMaster {

  showDialog = false;
  isEditMode = false;
  selectedEquipmentId: number | null = null;

  // ===== MASTER DATA =====
  equipments: EquipmentItem[] = [
    { id: 1, toolName: 'Drilling Machine', unit: 5 },
    { id: 2, toolName: 'Welding Machine', unit: 3 },
    { id: 3, toolName: 'Water Pump', unit: 4 }
  ];

  // ===== FILTERED TABLE DATA =====
  filteredEquipments: EquipmentItem[] = [];

  // ===== STRONGLY TYPED FORM =====
  form!: FormGroup<{
    toolName: FormControl<string | null>;
    unit: FormControl<number | null>;
  }>;

  constructor(
    private fb: FormBuilder,
    private adminApi: AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.form = this.fb.group({
      toolName: this.fb.control<string | null>(null, Validators.required),
      unit: this.fb.control<number | null>(null, [
        Validators.required,
        Validators.min(1)
      ])
    });

    // 🔥 INIT FILTER
    this.filteredEquipments = [...this.equipments];
  }

  // ===== SEARCH =====
  onSearch(event: Event) {
    const q = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredEquipments = this.equipments.filter(e =>
      e.toolName.toLowerCase().includes(q) ||
      e.unit.toString().includes(q)
    );
  }

  // ===== ADD =====
  openAddDialog() {
    this.isEditMode = false;
    this.selectedEquipmentId = null;
    this.form.reset();
    this.showDialog = true;
  }

  // ===== EDIT =====
  openEditDialog(item: EquipmentItem) {
    this.isEditMode = true;
    this.selectedEquipmentId = item.id;

    this.form.patchValue({
      toolName: item.toolName,
      unit: item.unit
    });

    this.showDialog = true;
  }

  // ===== SAVE (ADD / UPDATE) =====
  saveEquipment() {

    const payload = {
      id: this.selectedEquipmentId,
      toolName: this.form.value.toolName!,
      unit: this.form.value.unit!,
      network_ID: 'WEB',
      terminal_ID: 'ADMIN'
    };

    if (this.isEditMode) {

      const index = this.equipments.findIndex(
        e => e.id === this.selectedEquipmentId
      );

      if (index !== -1) {
        this.equipments[index] = {
          id: this.selectedEquipmentId!,
          toolName: payload.toolName,
          unit: payload.unit
        };
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Updated',
        detail: 'Equipment updated successfully'
      });

      // ❌ API (later)
      // this.adminApi.updateEquipment(payload).subscribe();

    } else {

      this.equipments.unshift({
        id: Date.now(),
        toolName: payload.toolName,
        unit: payload.unit
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Equipment added successfully'
      });

      // ❌ API (later)
      // this.adminApi.addEquipment(payload).subscribe();
    }

    // 🔁 REFRESH FILTER
    this.filteredEquipments = [...this.equipments];

    this.showDialog = false;
    this.form.reset();
  }

  // ===== DELETE (STANDARD – SAME AS MANPOWER) =====
  confirmDelete(id: number) {

    this.confirmationService.confirm({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this equipment?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptLabel: 'Yes, Delete',
      rejectLabel: 'Cancel',

      accept: () => {

        this.equipments = this.equipments.filter(e => e.id !== id);
        this.filteredEquipments = [...this.equipments];

        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Equipment deleted successfully'
        });

        // ❌ API (later)
        // this.adminApi.deleteEquipment({ id, network_ID:'WEB', terminal_ID:'ADMIN' }).subscribe();
      }
    });
  }
}
