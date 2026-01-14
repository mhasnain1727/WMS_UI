import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';

interface ActivityItem {
    type: 'inward' | 'outward' | 'transfer' | 'adjustment';
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
            type: 'inward',
            description: 'GRN-2024-0145 received - 500 units',
            user: 'John Doe',
            time: '10 min ago',
            icon: 'pi pi-sign-in',
            color: '#22c55e'
        },
        {
            type: 'outward',
            description: 'DC-2024-0892 dispatched to Customer A',
            user: 'Jane Smith',
            time: '25 min ago',
            icon: 'pi pi-sign-out',
            color: '#3b82f6'
        },
        {
            type: 'transfer',
            description: 'Stock transferred: Main WH → Branch WH',
            user: 'Mike Wilson',
            time: '1 hour ago',
            icon: 'pi pi-arrows-h',
            color: '#f59e0b'
        },
        {
            type: 'adjustment',
            description: 'Stock adjustment: PRD-045 (+20 units)',
            user: 'Sarah Johnson',
            time: '2 hours ago',
            icon: 'pi pi-sliders-h',
            color: '#8b5cf6'
        },
        {
            type: 'inward',
            description: 'GRN-2024-0144 received - 1200 units',
            user: 'John Doe',
            time: '3 hours ago',
            icon: 'pi pi-sign-in',
            color: '#22c55e'
        }
    ];
}