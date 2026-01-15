import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

interface TechnicalSanction {
    id: number;
    sanctionNo: string;
    estimateNo: string;
    division: string;
    sanctionedDate: string;
    sanctionedAmount: number;
    status: 'draft' | 'approved' | 'rejected' | 'under_review';
}

@Component({
    selector: 'app-inward',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, InputTextModule, TagModule, IconFieldModule, InputIconModule],
    template: `
        <div class="card">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 class="text-2xl font-semibold m-0">Technical Sanctions</h2>
                <div class="flex flex-col sm:flex-row gap-2">
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search"></p-inputicon>
                        <input pInputText type="text" placeholder="Search sanctions..." class="w-full sm:w-auto" />
                    </p-iconfield>
                    <button pButton label="New Sanction" icon="pi pi-plus" class="p-button-success"></button>
                </div>
            </div>

            <p-table [value]="inwardEntries" [paginator]="true" [rows]="10" [showCurrentPageReport]="true"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                     [rowsPerPageOptions]="[10, 25, 50]" responsiveLayout="scroll">
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="sanctionNo">Sanction No <p-sortIcon field="sanctionNo"></p-sortIcon></th>
                        <th pSortableColumn="estimateNo">Estimate No <p-sortIcon field="estimateNo"></p-sortIcon></th>
                        <th pSortableColumn="division">Division <p-sortIcon field="division"></p-sortIcon></th>
                        <th pSortableColumn="sanctionedDate">Sanctioned Date <p-sortIcon field="sanctionedDate"></p-sortIcon></th>
                        <th>Sanctioned Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </ng-template>
                <ng-template #body let-item>
                    <tr>
                        <td><span class="font-medium text-primary">{{ item.sanctionNo }}</span></td>
                        <td>{{ item.estimateNo }}</td>
                        <td>{{ item.division }}</td>
                        <td>{{ item.sanctionedDate }}</td>
                        <td class="font-semibold">₹{{ item.sanctionedAmount | number }}</td>
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
    inwardEntries: TechnicalSanction[] = [
        { id: 1, sanctionNo: 'TS-2024-0145', estimateNo: 'EST-2024-0089', division: 'Highways Division', sanctionedDate: '2024-01-14', sanctionedAmount: 2500000, status: 'approved' },
        { id: 2, sanctionNo: 'TS-2024-0144', estimateNo: 'EST-2024-0088', division: 'Buildings Division', sanctionedDate: '2024-01-13', sanctionedAmount: 1800000, status: 'approved' },
        { id: 3, sanctionNo: 'TS-2024-0143', estimateNo: 'EST-2024-0087', division: 'Water Works', sanctionedDate: '2024-01-12', sanctionedAmount: 3200000, status: 'under_review' },
        { id: 4, sanctionNo: 'TS-2024-0142', estimateNo: 'EST-2024-0085', division: 'Electrical Division', sanctionedDate: '2024-01-11', sanctionedAmount: 1200000, status: 'draft' },
        { id: 5, sanctionNo: 'TS-2024-0141', estimateNo: 'EST-2024-0084', division: 'Bridges Division', sanctionedDate: '2024-01-10', sanctionedAmount: 4500000, status: 'approved' },
        { id: 6, sanctionNo: 'TS-2024-0140', estimateNo: 'EST-2024-0083', division: 'Drainage Division', sanctionedDate: '2024-01-09', sanctionedAmount: 800000, status: 'rejected' },
    ];

    getStatusSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' {
        switch (status) {
            case 'approved': return 'success';
            case 'under_review': return 'warn';
            case 'draft': return 'info';
            case 'rejected': return 'danger';
            default: return 'info';
        }
    }
}
