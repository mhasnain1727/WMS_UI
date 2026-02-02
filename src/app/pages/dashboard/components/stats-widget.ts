import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatCard {
    title: string;
    value: string;
    change: string;
    changeText: string;
    icon: string;
    iconBg: string;
    iconColor: string;
    changeColor: string;
}

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    host: { class: 'contents' },
    template: `
        @for (stat of stats; track stat.title) {
            <div class="col-span-12 sm:col-span-6 xl:col-span-3">
                <div class="card mb-0 h-full">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-2">{{ stat.title }}</span>
                            <div class="text-surface-900 dark:text-surface-0 font-semibold text-2xl">{{ stat.value }}</div>
                        </div>
                        <div
                            class="flex items-center justify-center rounded-border shrink-0"
                            [ngClass]="stat.iconBg"
                            style="width: 3rem; height: 3rem">
                            <i [class]="'pi ' + stat.icon + ' text-xl'" [ngClass]="stat.iconColor"></i>
                        </div>
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="font-medium" [ngClass]="stat.changeColor">{{ stat.change }}</span>
                        <span class="text-muted-color">{{ stat.changeText }}</span>
                    </div>
                </div>
            </div>
        }
    `
})
export class StatsWidget {
    stats: StatCard[] = [
        {
            title: 'Active Projects',
            value: '156',
            change: '+8',
            changeText: 'new this month',
            icon: 'pi-building',
            iconBg: 'bg-blue-100 dark:bg-blue-400/10',
            iconColor: 'text-blue-500',
            changeColor: 'text-primary'
        },
        {
            title: 'Pending Approvals',
            value: '23',
            change: '5 urgent',
            changeText: 'need attention',
            icon: 'pi-file',
            iconBg: 'bg-orange-100 dark:bg-orange-400/10',
            iconColor: 'text-orange-500',
            changeColor: 'text-orange-500'
        },
        {
            title: 'Ongoing Contracts',
            value: '89',
            change: '+12%',
            changeText: 'from last quarter',
            icon: 'pi-briefcase',
            iconBg: 'bg-green-100 dark:bg-green-400/10',
            iconColor: 'text-green-500',
            changeColor: 'text-green-500'
        },
        {
            title: 'Completed This Month',
            value: '34',
            change: '18 ahead',
            changeText: 'of schedule',
            icon: 'pi-check-circle',
            iconBg: 'bg-cyan-100 dark:bg-cyan-400/10',
            iconColor: 'text-cyan-500',
            changeColor: 'text-cyan-500'
        }
    ];
}