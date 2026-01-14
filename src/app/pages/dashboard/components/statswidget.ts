import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    template: `
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Total Products</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">1,284</div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-box text-blue-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">+12 </span>
                <span class="text-muted-color">added this week</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Total Stock</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">45,230</div>
                    </div>
                    <div class="flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-warehouse text-green-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">+8.5% </span>
                <span class="text-muted-color">from last month</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Pending Inward</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">28</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-sign-in text-orange-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-orange-500 font-medium">5 urgent </span>
                <span class="text-muted-color">need attention</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Pending Outward</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">43</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-sign-out text-cyan-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-cyan-500 font-medium">12 ready </span>
                <span class="text-muted-color">for dispatch</span>
            </div>
        </div>
    `
})
export class StatsWidget {}