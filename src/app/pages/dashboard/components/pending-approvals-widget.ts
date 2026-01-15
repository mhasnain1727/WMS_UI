import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

interface PendingApproval {
    projectCode: string;
    projectName: string;
    submittedDate: string;
    daysPending: number;
    submittedBy: string;
    status: 'urgent' | 'normal' | 'overdue';
}

@Component({
    standalone: true,
    selector: 'app-pending-approvals-widget',
    imports: [CommonModule, TableModule, TagModule, ButtonModule],
    template: `
        <div class="card">
            <div class="flex items-center justify-between mb-6">
                <div class="font-semibold text-xl">Pending Approvals</div>
                <button pButton label="View All" class="p-button-text p-button-sm"></button>
            </div>
            <p-table [value]="pendingApprovals" [rows]="5" responsiveLayout="scroll">
                <ng-template #header>
                    <tr>
                        <th>Project</th>
                        <th>Submitted By</th>
                        <th>Days Pending</th>
                        <th>Status</th>
                    </tr>
                </ng-template>
                <ng-template #body let-item>
                    <tr>
                        <td>
                            <div class="font-medium">{{ item.projectCode }}</div>
                            <div class="text-muted-color text-sm">{{ item.projectName }}</div>
                        </td>
                        <td>{{ item.submittedBy }}</td>
                        <td class="font-semibold">{{ item.daysPending }}</td>
                        <td>
                            <p-tag [value]="item.status | titlecase" [severity]="getSeverity(item.status)"></p-tag>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `
})
export class PendingApprovalsWidget {
    pendingApprovals: PendingApproval[] = [
        { projectCode: 'PROJ-2024-001', projectName: 'Road Construction - NH-45', submittedDate: '2024-01-15', daysPending: 12, submittedBy: 'EE - Roads Division', status: 'urgent' },
        { projectCode: 'PROJ-2024-023', projectName: 'Bridge Repair - River Cross', submittedDate: '2024-01-10', daysPending: 8, submittedBy: 'AE - Bridges Dept', status: 'normal' },
        { projectCode: 'PROJ-2024-045', projectName: 'Water Supply Pipeline', submittedDate: '2024-01-08', daysPending: 15, submittedBy: 'JE - Water Works', status: 'overdue' },
        { projectCode: 'PROJ-2024-067', projectName: 'School Building Extension', submittedDate: '2024-01-12', daysPending: 6, submittedBy: 'EE - Buildings', status: 'normal' },
        { projectCode: 'PROJ-2024-089', projectName: 'Drainage System Upgrade', submittedDate: '2024-01-05', daysPending: 18, submittedBy: 'AE - Drainage', status: 'overdue' }
    ];

    getSeverity(status: string): 'danger' | 'warn' | 'info' {
        switch (status) {
            case 'urgent':
                return 'danger';
            case 'overdue':
                return 'warn';
            default:
                return 'info';
        }
    }
}