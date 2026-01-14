import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

interface LowStockItem {
    productCode: string;
    productName: string;
    currentStock: number;
    minStock: number;
    warehouse: string;
    status: 'critical' | 'low' | 'warning';
}

@Component({
    standalone: true,
    selector: 'app-low-stock-widget',
    imports: [CommonModule, TableModule, TagModule, ButtonModule],
    template: `
        <div class="card">
            <div class="flex items-center justify-between mb-6">
                <div class="font-semibold text-xl">Low Stock Alerts</div>
                <button pButton label="View All" class="p-button-text p-button-sm"></button>
            </div>
            <p-table [value]="lowStockItems" [rows]="5" responsiveLayout="scroll">
                <ng-template #header>
                    <tr>
                        <th>Product</th>
                        <th>Warehouse</th>
                        <th>Current</th>
                        <th>Min Stock</th>
                        <th>Status</th>
                    </tr>
                </ng-template>
                <ng-template #body let-item>
                    <tr>
                        <td>
                            <div class="font-medium">{{ item.productCode }}</div>
                            <div class="text-muted-color text-sm">{{ item.productName }}</div>
                        </td>
                        <td>{{ item.warehouse }}</td>
                        <td class="font-semibold">{{ item.currentStock }}</td>
                        <td>{{ item.minStock }}</td>
                        <td>
                            <p-tag [value]="item.status | titlecase" [severity]="getSeverity(item.status)"></p-tag>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `
})
export class LowStockWidget {
    lowStockItems: LowStockItem[] = [
        { productCode: 'PRD-001', productName: 'Steel Pipes 2"', currentStock: 15, minStock: 50, warehouse: 'Main WH', status: 'critical' },
        { productCode: 'PRD-045', productName: 'Cement Bags 50kg', currentStock: 120, minStock: 200, warehouse: 'Main WH', status: 'low' },
        { productCode: 'PRD-078', productName: 'PVC Fittings', currentStock: 85, minStock: 100, warehouse: 'Branch WH', status: 'warning' },
        { productCode: 'PRD-023', productName: 'Paint Buckets 20L', currentStock: 8, minStock: 30, warehouse: 'Main WH', status: 'critical' },
        { productCode: 'PRD-091', productName: 'Wire Cables 100m', currentStock: 45, minStock: 60, warehouse: 'Branch WH', status: 'warning' }
    ];

    getSeverity(status: string): 'danger' | 'warn' | 'info' {
        switch (status) {
            case 'critical':
                return 'danger';
            case 'low':
                return 'warn';
            default:
                return 'info';
        }
    }
}