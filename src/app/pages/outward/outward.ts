import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

interface OutwardEntry {
    id: number;
    dcNo: string;
    soNo: string;
    customer: string;
    dispatchDate: string;
    items: number;
    totalQty: number;
    status: 'pending' | 'ready' | 'dispatched' | 'delivered' | 'cancelled';
}

@Component({
    selector: 'app-outward',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
    template: `
        <div class="card">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 class="text-2xl font-semibold m-0">Outward (Delivery Challan)</h2>
                <div class="flex flex-col sm:flex-row gap-2">
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search"></p-inputicon>
                        <input pInputText type="text" placeholder="Search DC..." class="w-full sm:w-auto" />
                    </p-iconfield>
                    <button pButton label="New DC" icon="pi pi-plus" class="p-button-success"></button>
                </div>
            </div>

            <p-table [value]="outwardEntries" [paginator]="true" [rows]="10" [showCurrentPageReport]="true"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                     [rowsPerPageOptions]="[10, 25, 50]" responsiveLayout="scroll">
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="dcNo">DC No <p-sortIcon field="dcNo"></p-sortIcon></th>
                        <th pSortableColumn="soNo">SO No <p-sortIcon field="soNo"></p-sortIcon></th>
                        <th pSortableColumn="customer">Customer <p-sortIcon field="customer"></p-sortIcon></th>
                        <th pSortableColumn="dispatchDate">Dispatch Date <p-sortIcon field="dispatchDate"></p-sortIcon></th>
                        <th>Items</th>
                        <th>Total Qty</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </ng-template>
                <ng-template #body let-item>
                    <tr>
                        <td><span class="font-medium text-primary">{{ item.dcNo }}</span></td>
                        <td>{{ item.soNo }}</td>
                        <td>{{ item.customer }}</td>
                        <td>{{ item.dispatchDate }}</td>
                        <td>{{ item.items }}</td>
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
    outwardEntries: OutwardEntry[] = [
        { id: 1, dcNo: 'DC-2024-0892', soNo: 'SO-2024-0456', customer: 'Customer A Pvt Ltd', dispatchDate: '2024-01-14', items: 4, totalQty: 320, status: 'dispatched' },
        { id: 2, dcNo: 'DC-2024-0891', soNo: 'SO-2024-0455', customer: 'Builder Corp', dispatchDate: '2024-01-14', items: 6, totalQty: 890, status: 'ready' },
        { id: 3, dcNo: 'DC-2024-0890', soNo: 'SO-2024-0454', customer: 'Construct Ltd', dispatchDate: '2024-01-13', items: 2, totalQty: 150, status: 'delivered' },
        { id: 4, dcNo: 'DC-2024-0889', soNo: 'SO-2024-0453', customer: 'ABC Builders', dispatchDate: '2024-01-13', items: 8, totalQty: 1200, status: 'pending' },
        { id: 5, dcNo: 'DC-2024-0888', soNo: 'SO-2024-0452', customer: 'Customer A Pvt Ltd', dispatchDate: '2024-01-12', items: 3, totalQty: 450, status: 'delivered' },
        { id: 6, dcNo: 'DC-2024-0887', soNo: 'SO-2024-0451', customer: 'Metro Constructions', dispatchDate: '2024-01-11', items: 5, totalQty: 680, status: 'cancelled' },
    ];

    getStatusSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' | 'secondary' {
        switch (status) {
            case 'delivered': return 'success';
            case 'dispatched': return 'info';
            case 'ready': return 'warn';
            case 'pending': return 'secondary';
            case 'cancelled': return 'danger';
            default: return 'info';
        }
    }
}
