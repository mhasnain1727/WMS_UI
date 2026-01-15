import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

interface TenderPaper {
    id: number;
    dptNo: string;
    estimateNo: string;
    projectName: string;
    createdDate: string;
    estimatedValue: number;
    status: 'draft' | 'submitted' | 'approved' | 'rejected';
}

@Component({
    selector: 'app-outward',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
    template: `
        <div class="card">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 class="text-2xl font-semibold m-0">Draft Tender Papers</h2>
                <div class="flex flex-col sm:flex-row gap-2">
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search"></p-inputicon>
                        <input pInputText type="text" placeholder="Search tender papers..." class="w-full sm:w-auto" />
                    </p-iconfield>
                    <button pButton label="Create DTP" icon="pi pi-plus" class="p-button-success"></button>
                </div>
            </div>

            <p-table [value]="outwardEntries" [paginator]="true" [rows]="10" [showCurrentPageReport]="true"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                     [rowsPerPageOptions]="[10, 25, 50]" responsiveLayout="scroll">
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="dptNo">DTP No <p-sortIcon field="dptNo"></p-sortIcon></th>
                        <th pSortableColumn="estimateNo">Estimate No <p-sortIcon field="estimateNo"></p-sortIcon></th>
                        <th pSortableColumn="projectName">Project Name <p-sortIcon field="projectName"></p-sortIcon></th>
                        <th pSortableColumn="createdDate">Created Date <p-sortIcon field="createdDate"></p-sortIcon></th>
                        <th>Estimated Value</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </ng-template>
                <ng-template #body let-item>
                    <tr>
                        <td><span class="font-medium text-primary">{{ item.dptNo }}</span></td>
                        <td>{{ item.estimateNo }}</td>
                        <td>{{ item.projectName }}</td>
                        <td>{{ item.createdDate }}</td>
                        <td class="font-semibold">₹{{ item.estimatedValue | number }}</td>
                        <td class="font-semibold">{{ item.totalQty }}</td>
                        <td>
                            <p-tag [value]="item.status | titlecase" [severity]="getStatusSeverity(item.status)"></p-tag>
                        </td>
                        <td>
                            <button pButton icon="pi pi-eye" class="p-button-text p-button-sm" pTooltip="View"></button>
                            <button pButton icon="pi pi-print" class="p-button-text p-button-sm" pTooltip="Print"></button>
                            <button pButton icon="pi pi-truck" class="p-button-text p-button-sm" pTooltip="Dispatch" *ngIf="item.status === 'ready'"></button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `
})
export class Outward {
    outwardEntries: TenderPaper[] = [
        { id: 1, dptNo: 'DTP-2024-0892', estimateNo: 'EST-2024-0456', projectName: 'Road Construction - NH-45', createdDate: '2024-01-14', estimatedValue: 2500000, status: 'submitted' },
        { id: 2, dptNo: 'DTP-2024-0891', estimateNo: 'EST-2024-0455', projectName: 'Bridge Repair - River Cross', createdDate: '2024-01-14', estimatedValue: 1800000, status: 'approved' },
        { id: 3, dptNo: 'DTP-2024-0890', estimateNo: 'EST-2024-0454', projectName: 'Water Supply Pipeline', createdDate: '2024-01-13', estimatedValue: 3200000, status: 'draft' },
        { id: 4, dptNo: 'DTP-2024-0889', estimateNo: 'EST-2024-0453', projectName: 'School Building Extension', createdDate: '2024-01-13', estimatedValue: 4500000, status: 'submitted' },
        { id: 5, dptNo: 'DTP-2024-0888', estimateNo: 'EST-2024-0452', projectName: 'Electrical Substation', createdDate: '2024-01-12', estimatedValue: 1200000, status: 'approved' },
        { id: 6, dptNo: 'DTP-2024-0887', estimateNo: 'EST-2024-0451', projectName: 'Drainage System Upgrade', createdDate: '2024-01-11', estimatedValue: 800000, status: 'rejected' },
    ];

    getStatusSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' | 'secondary' {
        switch (status) {
            case 'approved': return 'success';
            case 'submitted': return 'info';
            case 'draft': return 'secondary';
            case 'rejected': return 'danger';
            default: return 'info';
        }
    }
}
