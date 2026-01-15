import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

interface EstimateItem {
    id: number;
    projectCode: string;
    projectName: string;
    division: string;
    category: string;
    estimatedCost: number;
    status: 'draft' | 'submitted' | 'approved' | 'rejected';
    submittedDate: string;
}

@Component({
    selector: 'app-inventory',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
    template: `
        <div class="card">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 class="text-2xl font-semibold m-0">Estimate Preparation</h2>
                <div class="flex flex-col sm:flex-row gap-2">
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search"></p-inputicon>
                        <input pInputText type="text" placeholder="Search estimates..." class="w-full sm:w-auto" />
                    </p-iconfield>
                    <button pButton label="Export" icon="pi pi-download" class="p-button-outlined"></button>
                </div>
            </div>

            <p-table [value]="inventoryItems" [paginator]="true" [rows]="10" [showCurrentPageReport]="true"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                     [rowsPerPageOptions]="[10, 25, 50]" responsiveLayout="scroll">
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="projectCode">Project Code <p-sortIcon field="projectCode"></p-sortIcon></th>
                        <th pSortableColumn="projectName">Project Name <p-sortIcon field="projectName"></p-sortIcon></th>
                        <th pSortableColumn="division">Division <p-sortIcon field="division"></p-sortIcon></th>
                        <th pSortableColumn="category">Category <p-sortIcon field="category"></p-sortIcon></th>
                        <th pSortableColumn="estimatedCost">Estimated Cost <p-sortIcon field="estimatedCost"></p-sortIcon></th>
                        <th>Submitted Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </ng-template>
                <ng-template #body let-item>
                    <tr>
                        <td><span class="font-medium">{{ item.projectCode }}</span></td>
                        <td>{{ item.projectName }}</td>
                        <td>{{ item.division }}</td>
                        <td>{{ item.category }}</td>
                        <td class="font-semibold">₹{{ item.estimatedCost | number }}</td>
                        <td>{{ item.submittedDate }}</td>
                        <td>
                            <p-tag [value]="getStatusLabel(item.status)" [severity]="getStatusSeverity(item.status)"></p-tag>
                        </td>
                        <td>
                            <button pButton icon="pi pi-eye" class="p-button-text p-button-sm"></button>
                            <button pButton icon="pi pi-pencil" class="p-button-text p-button-sm"></button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `
})
export class Inventory {
    inventoryItems: EstimateItem[] = [
        { id: 1, projectCode: 'PROJ-2024-001', projectName: 'Road Construction - NH-45', division: 'Highways Division', category: 'Infrastructure', estimatedCost: 2500000, status: 'approved', submittedDate: '2024-01-15' },
        { id: 2, projectCode: 'PROJ-2024-002', projectName: 'Bridge Repair - River Cross', division: 'Bridges Division', category: 'Infrastructure', estimatedCost: 1800000, status: 'submitted', submittedDate: '2024-01-12' },
        { id: 3, projectCode: 'PROJ-2024-003', projectName: 'Water Supply Pipeline', division: 'Water Works', category: 'Utilities', estimatedCost: 3200000, status: 'draft', submittedDate: '2024-01-10' },
        { id: 4, projectCode: 'PROJ-2024-004', projectName: 'School Building Extension', division: 'Buildings Division', category: 'Education', estimatedCost: 4500000, status: 'approved', submittedDate: '2024-01-08' },
        { id: 5, projectCode: 'PROJ-2024-005', projectName: 'Drainage System Upgrade', division: 'Drainage Division', category: 'Infrastructure', estimatedCost: 1200000, status: 'rejected', submittedDate: '2024-01-05' },
        { id: 6, projectCode: 'PROJ-2024-006', projectName: 'Electrical Substation', division: 'Electrical Division', category: 'Power', estimatedCost: 2800000, status: 'submitted', submittedDate: '2024-01-03' },
        { id: 7, projectCode: 'PROJ-2024-007', projectName: 'Community Health Center', division: 'Health Division', category: 'Healthcare', estimatedCost: 6500000, status: 'approved', submittedDate: '2023-12-28' },
        { id: 8, projectCode: 'PROJ-2024-008', projectName: 'Park Development', division: 'Parks Division', category: 'Recreation', estimatedCost: 800000, status: 'draft', submittedDate: '2023-12-25' },
    ];

    getStatusLabel(status: string): string {
        switch (status) {
            case 'draft': return 'Draft';
            case 'submitted': return 'Submitted';
            case 'approved': return 'Approved';
            case 'rejected': return 'Rejected';
            default: return status;
        }
    }

    getStatusSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' {
        switch (status) {
            case 'draft': return 'info';
            case 'submitted': return 'warn';
            case 'approved': return 'success';
            case 'rejected': return 'danger';
            default: return 'info';
        }
    }
}
