import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

interface Project {
    id: number;
    code: string;
    name: string;
    division: string;
    category: string;
    estimatedCost: number;
    status: 'planning' | 'approved' | 'ongoing' | 'completed';
}

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
    template: `
        <div class="card">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 class="text-2xl font-semibold m-0">Projects Master</h2>
                <div class="flex flex-col sm:flex-row gap-2">
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search"></p-inputicon>
                        <input pInputText type="text" placeholder="Search projects..." class="w-full sm:w-auto" />
                    </p-iconfield>
                    <button pButton label="Add Project" icon="pi pi-plus" class="p-button-success"></button>
                </div>
            </div>

            <p-table [value]="products" [paginator]="true" [rows]="10" [showCurrentPageReport]="true"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} projects"
                     [rowsPerPageOptions]="[10, 25, 50]" responsiveLayout="scroll">
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="code">Project Code <p-sortIcon field="code"></p-sortIcon></th>
                        <th pSortableColumn="name">Project Name <p-sortIcon field="name"></p-sortIcon></th>
                        <th pSortableColumn="division">Division <p-sortIcon field="division"></p-sortIcon></th>
                        <th pSortableColumn="category">Category <p-sortIcon field="category"></p-sortIcon></th>
                        <th pSortableColumn="estimatedCost">Estimated Cost <p-sortIcon field="estimatedCost"></p-sortIcon></th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </ng-template>
                <ng-template #body let-item>
                    <tr>
                        <td><span class="font-medium">{{ item.code }}</span></td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.division }}</td>
                        <td>{{ item.category }}</td>
                        <td class="font-semibold">₹{{ item.estimatedCost | number }}</td>
                        <td>
                            <p-tag [value]="item.status | titlecase" [severity]="getStatusSeverity(item.status)"></p-tag>
                        </td>
                        <td>
                            <button pButton icon="pi pi-pencil" class="p-button-text p-button-sm"></button>
                            <button pButton icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm"></button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `
})
export class Products {
    products: Project[] = [
        { id: 1, code: 'PROJ-2024-001', name: 'Road Construction - NH-45', division: 'Highways Division', category: 'Infrastructure', estimatedCost: 2500000, status: 'planning' },
        { id: 2, code: 'PROJ-2024-002', name: 'Bridge Repair - River Cross', division: 'Bridges Division', category: 'Infrastructure', estimatedCost: 1800000, status: 'approved' },
        { id: 3, code: 'PROJ-2024-003', name: 'Water Supply Pipeline', division: 'Water Works', category: 'Utilities', estimatedCost: 3200000, status: 'ongoing' },
        { id: 4, code: 'PROJ-2024-004', name: 'School Building Extension', division: 'Buildings Division', category: 'Education', estimatedCost: 4500000, status: 'completed' },
        { id: 5, code: 'PROJ-2024-005', name: 'Electrical Substation', division: 'Electrical Division', category: 'Power', estimatedCost: 1200000, status: 'planning' },
        { id: 6, code: 'PROJ-2024-006', name: 'Drainage System Upgrade', division: 'Drainage Division', category: 'Infrastructure', estimatedCost: 800000, status: 'approved' },
        { id: 7, code: 'PROJ-2024-007', name: 'Community Health Center', division: 'Health Division', category: 'Healthcare', estimatedCost: 6500000, status: 'ongoing' },
        { id: 8, code: 'PROJ-2024-008', name: 'Park Development', division: 'Parks Division', category: 'Recreation', estimatedCost: 950000, status: 'completed' },
    ];

    getStatusSeverity(status: string): 'success' | 'warn' | 'info' | 'danger' {
        switch (status) {
            case 'completed': return 'success';
            case 'ongoing': return 'info';
            case 'approved': return 'warn';
            case 'planning': return 'info';
            default: return 'info';
        }
    }
}
