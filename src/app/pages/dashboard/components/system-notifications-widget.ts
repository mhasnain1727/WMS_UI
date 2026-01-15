import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
    standalone: true,
    selector: 'app-system-notifications-widget',
    imports: [ButtonModule, MenuModule],
    template: `<div class="card">
        <div class="flex items-center justify-between mb-6">
            <div class="font-semibold text-xl">Notifications</div>
            <div>
                <button pButton type="button" icon="pi pi-ellipsis-v" class="p-button-rounded p-button-text p-button-plain" (click)="menu.toggle($event)"></button>
                <p-menu #menu [popup]="true" [model]="items"></p-menu>
            </div>
        </div>

        <span class="block text-muted-color font-medium mb-4">TODAY</span>
        <ul class="p-0 mx-0 mt-0 mb-6 list-none">
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-check-circle text-xl! text-blue-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal"
                    >Technical Sanction
                    <span class="text-surface-700 dark:text-surface-100">approved for <span class="text-primary font-bold">PROJ-2024-001</span></span>
                </span>
            </li>
            <li class="flex items-center py-2">
                <div class="w-12 h-12 flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-clock text-xl! text-orange-500"></i>
                </div>
                <span class="text-surface-700 dark:text-surface-100 leading-normal">Project deadline approaching for <span class="text-primary font-bold">NH-45 Road Construction</span> - 3 days remaining.</span>
            </li>
        </ul>

        <span class="block text-muted-color font-medium mb-4">YESTERDAY</span>
        <ul class="p-0 m-0 list-none mb-6">
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-check-circle text-xl! text-blue-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal"
                    >Work Order
                    <span class="text-surface-700 dark:text-surface-100">issued for <span class="text-primary font-bold">Bridge Repair Project</span></span>
                </span>
            </li>
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-file-text text-xl! text-green-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal"
                    >Estimate Submitted
                    <span class="text-surface-700 dark:text-surface-100">for <span class="text-primary font-bold">Water Supply Pipeline</span> project</span>
                </span>
            </li>
        </ul>

        <span class="block text-muted-color font-medium mb-4">LAST WEEK</span>
        <ul class="p-0 m-0 list-none">
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-users text-xl! text-purple-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal">New contractor <span class="text-primary font-bold">ABC Construction</span> registered.</span>
            </li>
            <li class="flex items-center py-2">
                <div class="w-12 h-12 flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-chart-line text-xl! text-cyan-500"></i>
                </div>
                <span class="text-surface-700 dark:text-surface-100 leading-normal">Monthly progress report generated for <span class="text-primary font-bold">Q1 2024</span>.</span>
            </li>
        </ul>
    </div>`,
})
export class SystemNotificationsWidget {
    items = [
        {
            label: 'Mark All Read',
            icon: 'pi pi-check-circle'
        },
        {
            label: 'Notification Settings',
            icon: 'pi pi-cog'
        }
    ];
}