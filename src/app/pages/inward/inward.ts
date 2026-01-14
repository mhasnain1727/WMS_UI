import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

interface InwardEntry {
    id: number;
    grnNo: string;
    poNo: string;
    supplier: string;
    receivedDate: string;
    items: number;
    totalQty: number;
    status: 'pending' | 'partial' | 'completed' | 'cancelled';
}

@Component({
    selector: 'app-inward',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
    template: `
        <div class="card">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 class="text-2xl font-semibold m-0">Inward (GRN)</h2>
                <div class="flex flex-col sm:flex-row gap-2">
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search"></p-inputicon>
                        <input pInputText type="text" placeholder="Search GRN..." class="w-full sm:w-auto" />
                    </p-iconfield>
                    <button pButton label="New GRN" icon="pi pi-plus" class="p-button-success"></button>
                </div>
            </div>

            <p-table [value]="inwardEntries" [paginator]="true" [rows]="10" [showCurrentPageReport]="true"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                     [rowsPerPageOptions]="[10, 25, 50]" responsiveLayout="scroll">
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="grnNo">GRN No <p-sortIcon field="grnNo"></p-sortIcon></th>
                        <th pSortableColumn="poNo">PO No <p-sortIcon field="poNo"></p-sortIcon></th>
                        <th pSortableColumn="supplier">Supplier <p-sortIcon field="supplier"></p-sortIcon></th>
                        <th pSortableColumn="receivedDate">Received Date <p-sortIcon field="receivedDate"></p-sortIcon></th>
                        <th>Items</th>
                        <th>Total Qty</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </ng-template>
                <ng-template #body let-item>
                    <tr>
                        <td><span class="font-medium text-primary">{{ item.grnNo }}</span></td>
                        <td>{{ item.poNo }}</td>
                        <td>{{ item.supplier }}</td>
                        <td>{{ item.receivedDate }}</td>
                        <td>{{ item.items }}</td>
                        <td class="font-semibold">{{ item.totalQty }}</td>
                        <td>
                            <p-tag [value]="item.status | titlecase" [severity]="getStatusSeverity(item.status)"></p-tag>
                        </td>
                        <td>
                            <button pButton icon="pi pi-eye" class="p-button-text p-button-sm" pTooltip="View"></button>
                            <button pButton icon="pi pi-print" class="p-button-text p-button-sm" pTooltip="Print"></button>
                            <button pButton icon="pi pi-pencil" class="p-button-text p-button-sm" pTooltip="Edit" *ngIf="item.status === 'pending'"></button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `
})
export class Inward {
    inwardEntries: InwardEntry[] = [
        { id: 1, grnNo: 'GRN-2024-0145', poNo: 'PO-2024-0089', supplier: 'ABC Supplies Ltd', receivedDate: '2024-01-14', items: 5, totalQty: 500, status: 'completed' },
        { id: 2, grnNo: 'GRN-2024-0144', poNo: 'PO-2024-0088', supplier: 'XYZ Materials', receivedDate: '2024-01-13', items: 3, totalQty: 1200, status: 'completed' },
        { id: 3, grnNo: 'GRN-2024-0143', poNo: 'PO-2024-0087', supplier: 'Steel Corp', receivedDate: '2024-01-12', items: 8, totalQty: 350, status: 'partial' },
        { id: 4, grnNo: 'GRN-2024-0142', poNo: 'PO-2024-0085', supplier: 'BuildMart Inc', receivedDate: '2024-01-11', items: 2, totalQty: 800, status: 'pending' },
        { id: 5, grnNo: 'GRN-2024-0141', poNo: 'PO-2024-0084', supplier: 'ABC Supplies Ltd', receivedDate: '2024-01-10', items: 6, totalQty: 2400, status: 'completed' },
        { id: 6, grnNo: 'GRN-2024-0140', poNo: 'PO-2024-0083', supplier: 'Hardware Plus', receivedDate: '2024-01-09', items: 4, totalQty: 180, status: 'cancelled' },
    ];

    getStatusSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' {
        switch (status) {
            case 'completed': return 'success';
            case 'partial': return 'warn';
            case 'pending': return 'info';
            case 'cancelled': return 'danger';
            default: return 'info';
        }
    }
}
