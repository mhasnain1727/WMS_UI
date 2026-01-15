import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';

interface ActivityItem {
    type: 'approval' | 'submission' | 'completion' | 'contract';
    description: string;
    user: string;
    time: string;
    icon: string;
    color: string;
}

@Component({
    standalone: true,
    selector: 'app-recent-activity-widget',
    imports: [CommonModule, TimelineModule, CardModule],
    template: `
        <div class="card">
            <div class="font-semibold text-xl mb-6">Recent Activity</div>
            <p-timeline [value]="activities" align="left" styleClass="customized-timeline">
                <ng-template #content let-activity>
                    <div class="flex flex-col gap-1">
                        <span class="font-medium">{{ activity.description }}</span>
                        <span class="text-muted-color text-sm">by {{ activity.user }}</span>
                    </div>
                </ng-template>
                <ng-template #opposite let-activity>
                    <span class="text-muted-color text-sm">{{ activity.time }}</span>
                </ng-template>
                <ng-template #marker let-activity>
                    <span
                        class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm"
                        [style.backgroundColor]="activity.color">
                        <i [class]="activity.icon"></i>
                    </span>
                </ng-template>
            </p-timeline>
        </div>
    `
})
export class RecentActivityWidget {
    activities: ActivityItem[] = [
        {
            type: 'approval',
            description: 'Technical Sanction approved for PROJ-2024-001',
            user: 'Superintending Engineer',
            time: '10 min ago',
            icon: 'pi pi-check-circle',
            color: '#22c55e'
        },
        {
            type: 'submission',
            description: 'Estimate submitted for Bridge Repair Project',
            user: 'Executive Engineer',
            time: '25 min ago',
            icon: 'pi pi-file-text',
            color: '#3b82f6'
        },
        {
            type: 'contract',
            description: 'Work Order issued for Road Construction NH-45',
            user: 'Deputy Engineer',
            time: '1 hour ago',
            icon: 'pi pi-briefcase',
            color: '#f59e0b'
        },
        {
            type: 'completion',
            description: 'Measurement Book updated for PROJ-2024-023',
            user: 'Junior Engineer',
            time: '2 hours ago',
            icon: 'pi pi-book',
            color: '#8b5cf6'
        },
        {
            type: 'approval',
            description: 'Tender evaluation completed for Water Supply Project',
            user: 'Superintending Engineer',
            time: '3 hours ago',
            icon: 'pi pi-check-circle',
            color: '#22c55e'
        }
    ];
}