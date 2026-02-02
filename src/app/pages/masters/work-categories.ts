import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

interface WorkType {
  id: number;
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
<p-confirmDialog></p-confirmDialog>

<div class="card p-4">

<!-- ================= WORK TYPE ================= -->
<div class="flex flex-col items-center mb-4">
  <h2 class="text-2xl font-semibold">Work Type Master</h2>

  <div class="flex gap-3 mt-3">
    <p-iconfield>
      <p-inputicon styleClass="pi pi-search"></p-inputicon>
      <input pInputText placeholder="Search work type..."
        (input)="onWorkTypeSearch($event)">
    </p-iconfield>

    <button pButton label="Add Work Type" icon="pi pi-plus"
      class="p-button-success"
      (click)="openAddWorkType()">
    </button>
  </div>
</div>

<p-table [value]="filteredWorkTypes" [rows]="5" [paginator]="true">
  <ng-template #header>
    <tr>
      <th>Work Type</th>
      <th style="text-align:right;">Actions</th>
    </tr>
  </ng-template>

  <ng-template #body let-item>
    <tr>
      <td>{{ item.name }}</td>
      <td style="text-align:right;">
        <button pButton icon="pi pi-pencil"
          class="p-button-text p-button-sm mr-2"
          (click)="openEditWorkType(item)">
        </button>

        <button pButton icon="pi pi-trash"
          class="p-button-text p-button-danger p-button-sm"
          (click)="confirmDeleteWorkType(item.id)">
        </button>
      </td>
    </tr>
  </ng-template>
</p-table>

<!-- ================= SUB WORK TYPE ================= -->
<div class="flex flex-col items-center mt-6 mb-4">
  <h2 class="text-2xl font-semibold">Sub Work Type Master</h2>

  <div class="flex gap-3 mt-3">
    <select class="p-inputtext"
      [(ngModel)]="selectedWorkTypeId">
      <option [ngValue]="null">Filter by Work Type</option>
      <option *ngFor="let w of workTypes" [value]="w.id">
        {{ w.name }}
      </option>
    </select>

    <p-iconfield>
      <p-inputicon styleClass="pi pi-search"></p-inputicon>
      <input pInputText placeholder="Search sub work type..."
        (input)="onSubWorkTypeSearch($event)">
    </p-iconfield>

    <button pButton label="Add Sub Work Type" icon="pi pi-plus"
      class="p-button-success"
      [disabled]="!selectedWorkTypeId"
      (click)="openAddSubWorkType()">
    </button>
  </div>
</div>

<p-table [value]="filteredSubWorkTypes" [rows]="5" [paginator]="true">
  <ng-template #header>
    <tr>
      <th>Work Type</th>
      <th>Sub Work Type</th>
      <th style="text-align:right;">Actions</th>
    </tr>
  </ng-template>

  <ng-template #body let-item>
    <tr>
      <td>{{ item.workTypeName }}</td>
      <td>{{ item.name }}</td>
      <td style="text-align:right;">
        <button pButton icon="pi pi-pencil"
          class="p-button-text p-button-sm mr-2"
          (click)="openEditSubWorkType(item)">
        </button>

        <button pButton icon="pi pi-trash"
          class="p-button-text p-button-danger p-button-sm"
          (click)="confirmDeleteSubWorkType(item.id)">
        </button>
      </td>
    </tr>
  </ng-template>
</p-table>
</div>

<!-- ================= WORK TYPE DIALOG ================= -->
<p-dialog
  [header]="isEditWorkType ? 'Edit Work Type' : 'Add Work Type'"
  [(visible)]="showWorkTypeDialog"
  [modal]="true"
  [style]="{width:'400px'}">

<form [formGroup]="workTypeForm" class="flex flex-col gap-3">
  <input pInputText placeholder="Work Type Name" formControlName="name">

  <div class="flex justify-content-end gap-2 mt-3">
    <button pButton label="Cancel" severity="secondary"
      type="button"
      (click)="showWorkTypeDialog=false">
    </button>

    <button pButton label="Save"
      [disabled]="workTypeForm.invalid"
      type="button"
      (click)="saveWorkType()">
    </button>
  </div>
</form>
</p-dialog>

<!-- ================= SUB WORK TYPE DIALOG ================= -->
<p-dialog
  [header]="isEditSubWorkType ? 'Edit Sub Work Type' : 'Add Sub Work Type'"
  [(visible)]="showSubWorkTypeDialog"
  [modal]="true"
  [style]="{width:'400px'}">

<form [formGroup]="subWorkTypeForm" class="flex flex-col gap-3">

  <select class="p-inputtext" formControlName="workTypeId">
    <option [ngValue]="null">Select Work Type</option>
    <option *ngFor="let w of workTypes" [value]="w.id">
      {{ w.name }}
    </option>
  </select>

  <input pInputText placeholder="Sub Work Type Name" formControlName="name">

  <div class="flex justify-content-end gap-2 mt-3">
    <button pButton label="Cancel" severity="secondary"
      type="button"
      (click)="showSubWorkTypeDialog=false">
    </button>

    <button pButton label="Save"
      [disabled]="subWorkTypeForm.invalid"
      type="button"
      (click)="saveSubWorkType()">
    </button>
  </div>
</form>
</p-dialog>
`
})
export class WorkTypeMaster {

  workTypes: WorkType[] = [
    { id: 1, name: 'Electrical' },
    { id: 2, name: 'Civil' },
    { id: 3, name: 'Plumbing' }
  ];

  subWorkTypes: SubWorkType[] = [
    { id: 1, workTypeId: 1, workTypeName: 'Electrical', name: 'Wiring' }
  ];

  filteredWorkTypes: WorkType[] = [];
  filteredSubWorkTypes: SubWorkType[] = [];

  selectedWorkTypeId: number | null = null;

  showWorkTypeDialog = false;
  showSubWorkTypeDialog = false;
  isEditWorkType = false;
  isEditSubWorkType = false;

  editWorkTypeId: number | null = null;
  editSubWorkTypeId: number | null = null;

  workTypeForm: FormGroup;
  subWorkTypeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.workTypeForm = this.fb.group({
      name: [null, Validators.required]
    });

    this.subWorkTypeForm = this.fb.group({
      workTypeId: [null, Validators.required],
      name: [null, Validators.required]
    });

    this.refresh();
  }

  refresh() {
    this.filteredWorkTypes = [...this.workTypes];
    this.filteredSubWorkTypes = [...this.subWorkTypes];
  }

  onWorkTypeSearch(e: any) {
    const q = e.target.value.toLowerCase();
    this.filteredWorkTypes =
      this.workTypes.filter(w => w.name.toLowerCase().includes(q));
  }

  onSubWorkTypeSearch(e: any) {
    const q = e.target.value.toLowerCase();
    this.filteredSubWorkTypes =
      this.subWorkTypes.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.workTypeName.toLowerCase().includes(q));
  }

  openAddWorkType() {
    this.isEditWorkType = false;
    this.workTypeForm.reset();
    this.showWorkTypeDialog = true;
  }

  openEditWorkType(w: WorkType) {
    this.isEditWorkType = true;
    this.editWorkTypeId = w.id;
    this.workTypeForm.patchValue({ name: w.name });
    this.showWorkTypeDialog = true;
  }

  saveWorkType() {
    const name = this.workTypeForm.value.name;

    if (this.isEditWorkType) {
      const i = this.workTypes.findIndex(w => w.id === this.editWorkTypeId);
      if (i !== -1) this.workTypes[i].name = name;
    } else {
      this.workTypes.unshift({ id: Date.now(), name });
    }

    this.refresh();
    this.showWorkTypeDialog = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Work Type saved successfully'
    });
  }

  confirmDeleteWorkType(id: number) {
    this.confirmationService.confirm({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this work type?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.workTypes = this.workTypes.filter(w => w.id !== id);
        this.subWorkTypes = this.subWorkTypes.filter(s => s.workTypeId !== id);
        this.refresh();

        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Work Type deleted successfully'
        });
      }
    });
  }

  openAddSubWorkType() {
    this.isEditSubWorkType = false;
    this.subWorkTypeForm.reset();
    this.subWorkTypeForm.patchValue({ workTypeId: this.selectedWorkTypeId });
    this.showSubWorkTypeDialog = true;
  }

  openEditSubWorkType(s: SubWorkType) {
    this.isEditSubWorkType = true;
    this.editSubWorkTypeId = s.id;
    this.subWorkTypeForm.patchValue({
      workTypeId: s.workTypeId,
      name: s.name
    });
    this.showSubWorkTypeDialog = true;
  }

  saveSubWorkType() {
    const workTypeId = Number(this.subWorkTypeForm.value.workTypeId);
    const name = this.subWorkTypeForm.value.name;
    const wt = this.workTypes.find(w => w.id === workTypeId);
    if (!wt) return;

    if (this.isEditSubWorkType) {
      const i = this.subWorkTypes.findIndex(s => s.id === this.editSubWorkTypeId);
      if (i !== -1) {
        this.subWorkTypes[i] = {
          id: this.editSubWorkTypeId!,
          workTypeId,
          workTypeName: wt.name,
          name
        };
      }
    } else {
      this.subWorkTypes.unshift({
        id: Date.now(),
        workTypeId,
        workTypeName: wt.name,
        name
      });
    }

    this.refresh();
    this.showSubWorkTypeDialog = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Sub Work Type saved successfully'
    });
  }

  confirmDeleteSubWorkType(id: number) {
    this.confirmationService.confirm({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this sub work type?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.subWorkTypes = this.subWorkTypes.filter(s => s.id !== id);
        this.refresh();

        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Sub Work Type deleted successfully'
        });
      }
    });
  }
}
