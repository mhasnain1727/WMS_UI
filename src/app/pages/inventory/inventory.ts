import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

interface InventoryItem {
    id: number;
    productCode: string;
    productName: string;
    category: string;
    warehouse: string;
    location: string;
    quantity: number;
    uom: string;
    status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

@Component({
    selector: 'app-inventory',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
    template: `
        <div class="card">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 class="text-2xl font-semibold m-0">Inventory</h2>
                <div class="flex flex-col sm:flex-row gap-2">
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search"></p-inputicon>
                        <input pInputText type="text" placeholder="Search inventory..." class="w-full sm:w-auto" />
                    </p-iconfield>
                    <button pButton label="Export" icon="pi pi-download" class="p-button-outlined"></button>
                </div>
            </div>

            <p-table [value]="inventoryItems" [paginator]="true" [rows]="10" [showCurrentPageReport]="true"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                     [rowsPerPageOptions]="[10, 25, 50]" responsiveLayout="scroll">
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="productCode">Code <p-sortIcon field="productCode"></p-sortIcon></th>
                        <th pSortableColumn="productName">Product <p-sortIcon field="productName"></p-sortIcon></th>
                        <th pSortableColumn="category">Category <p-sortIcon field="category"></p-sortIcon></th>
                        <th pSortableColumn="warehouse">Warehouse <p-sortIcon field="warehouse"></p-sortIcon></th>
                        <th>Location</th>
                        <th pSortableColumn="quantity">Qty <p-sortIcon field="quantity"></p-sortIcon></th>
                        <th>UOM</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </ng-template>
                <ng-template #body let-item>
                    <tr>
                        <td><span class="font-medium">{{ item.productCode }}</span></td>
                        <td>{{ item.productName }}</td>
                        <td>{{ item.category }}</td>
                        <td>{{ item.warehouse }}</td>
                        <td>{{ item.location }}</td>
                        <td class="font-semibold">{{ item.quantity }}</td>
                        <td>{{ item.uom }}</td>
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
    inventoryItems: InventoryItem[] = [
        { id: 1, productCode: 'PRD-001', productName: 'Steel Pipes 2"', category: 'Construction', warehouse: 'Main WH', location: 'A-01-01', quantity: 150, uom: 'PCS', status: 'in-stock' },
        { id: 2, productCode: 'PRD-002', productName: 'Cement Bags 50kg', category: 'Construction', warehouse: 'Main WH', location: 'B-02-03', quantity: 45, uom: 'BAG', status: 'low-stock' },
        { id: 3, productCode: 'PRD-003', productName: 'PVC Fittings', category: 'Plumbing', warehouse: 'Branch WH', location: 'C-01-02', quantity: 0, uom: 'PCS', status: 'out-of-stock' },
        { id: 4, productCode: 'PRD-004', productName: 'Paint Buckets 20L', category: 'Finishing', warehouse: 'Main WH', location: 'D-03-01', quantity: 280, uom: 'PCS', status: 'in-stock' },
        { id: 5, productCode: 'PRD-005', productName: 'Wire Cables 100m', category: 'Electrical', warehouse: 'Branch WH', location: 'E-02-04', quantity: 32, uom: 'ROLL', status: 'low-stock' },
        { id: 6, productCode: 'PRD-006', productName: 'Bricks Standard', category: 'Construction', warehouse: 'Main WH', location: 'A-04-02', quantity: 5000, uom: 'PCS', status: 'in-stock' },
        { id: 7, productCode: 'PRD-007', productName: 'Glass Sheets 6mm', category: 'Finishing', warehouse: 'Main WH', location: 'F-01-01', quantity: 120, uom: 'SQM', status: 'in-stock' },
        { id: 8, productCode: 'PRD-008', productName: 'Tiles Ceramic', category: 'Finishing', warehouse: 'Branch WH', location: 'G-02-03', quantity: 0, uom: 'BOX', status: 'out-of-stock' },
    ];

    getStatusLabel(status: string): string {
        switch (status) {
            case 'in-stock': return 'In Stock';
            case 'low-stock': return 'Low Stock';
            case 'out-of-stock': return 'Out of Stock';
            default: return status;
        }
    }

    getStatusSeverity(status: string): 'success' | 'warn' | 'danger' {
        switch (status) {
            case 'in-stock': return 'success';
            case 'low-stock': return 'warn';
            case 'out-of-stock': return 'danger';
            default: return 'success';
        }
    }
}
