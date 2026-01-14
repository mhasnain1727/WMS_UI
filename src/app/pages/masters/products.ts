import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

interface Product {
    id: number;
    code: string;
    name: string;
    category: string;
    uom: string;
    minStock: number;
    maxStock: number;
    status: 'active' | 'inactive';
}

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
    template: `
        <div class="card">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 class="text-2xl font-semibold m-0">Products Master</h2>
                <div class="flex flex-col sm:flex-row gap-2">
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search"></p-inputicon>
                        <input pInputText type="text" placeholder="Search products..." class="w-full sm:w-auto" />
                    </p-iconfield>
                    <button pButton label="Add Product" icon="pi pi-plus" class="p-button-success"></button>
                </div>
            </div>

            <p-table [value]="products" [paginator]="true" [rows]="10" [showCurrentPageReport]="true"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                     [rowsPerPageOptions]="[10, 25, 50]" responsiveLayout="scroll">
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="code">Code <p-sortIcon field="code"></p-sortIcon></th>
                        <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
                        <th pSortableColumn="category">Category <p-sortIcon field="category"></p-sortIcon></th>
                        <th>UOM</th>
                        <th>Min Stock</th>
                        <th>Max Stock</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </ng-template>
                <ng-template #body let-item>
                    <tr>
                        <td><span class="font-medium">{{ item.code }}</span></td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.category }}</td>
                        <td>{{ item.uom }}</td>
                        <td>{{ item.minStock }}</td>
                        <td>{{ item.maxStock }}</td>
                        <td>
                            <p-tag [value]="item.status | titlecase" [severity]="item.status === 'active' ? 'success' : 'danger'"></p-tag>
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
    products: Product[] = [
        { id: 1, code: 'PRD-001', name: 'Steel Pipes 2"', category: 'Construction', uom: 'PCS', minStock: 50, maxStock: 500, status: 'active' },
        { id: 2, code: 'PRD-002', name: 'Cement Bags 50kg', category: 'Construction', uom: 'BAG', minStock: 100, maxStock: 1000, status: 'active' },
        { id: 3, code: 'PRD-003', name: 'PVC Fittings', category: 'Plumbing', uom: 'PCS', minStock: 200, maxStock: 2000, status: 'active' },
        { id: 4, code: 'PRD-004', name: 'Paint Buckets 20L', category: 'Finishing', uom: 'PCS', minStock: 30, maxStock: 300, status: 'active' },
        { id: 5, code: 'PRD-005', name: 'Wire Cables 100m', category: 'Electrical', uom: 'ROLL', minStock: 25, maxStock: 250, status: 'inactive' },
        { id: 6, code: 'PRD-006', name: 'Bricks Standard', category: 'Construction', uom: 'PCS', minStock: 1000, maxStock: 10000, status: 'active' },
        { id: 7, code: 'PRD-007', name: 'Glass Sheets 6mm', category: 'Finishing', uom: 'SQM', minStock: 50, maxStock: 500, status: 'active' },
        { id: 8, code: 'PRD-008', name: 'Tiles Ceramic', category: 'Finishing', uom: 'BOX', minStock: 100, maxStock: 800, status: 'active' },
    ];
}
