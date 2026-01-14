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
            title: 'Total Products',
            value: '1,284',
            change: '+12',
            changeText: 'added this week',
            icon: 'pi-box',
            iconBg: 'bg-blue-100 dark:bg-blue-400/10',
            iconColor: 'text-blue-500',
            changeColor: 'text-primary'
        },
        {
            title: 'Total Stock',
            value: '45,230',
            change: '+8.5%',
            changeText: 'from last month',
            icon: 'pi-warehouse',
            iconBg: 'bg-green-100 dark:bg-green-400/10',
            iconColor: 'text-green-500',
            changeColor: 'text-green-500'
        },
        {
            title: 'Pending Inward',
            value: '28',
            change: '5 urgent',
            changeText: 'need attention',
            icon: 'pi-sign-in',
            iconBg: 'bg-orange-100 dark:bg-orange-400/10',
            iconColor: 'text-orange-500',
            changeColor: 'text-orange-500'
        },
        {
            title: 'Pending Outward',
            value: '43',
            change: '12 ready',
            changeText: 'for dispatch',
            icon: 'pi-sign-out',
            iconBg: 'bg-cyan-100 dark:bg-cyan-400/10',
            iconColor: 'text-cyan-500',
            changeColor: 'text-cyan-500'
        }
    ];
}
