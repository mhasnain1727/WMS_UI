import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsWidget } from './components/stats-widget';
import { PendingApprovalsWidget } from './components/pending-approvals-widget';
import { RecentActivityWidget } from './components/recent-activity-widget';
import { ProjectStatusWidget } from './components/project-status-widget';
import { ProjectExpenditureWidget } from './components/project-expenditure-widget';
import { DepartmentPerformanceWidget } from './components/department-performance-widget';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        StatsWidget,
        PendingApprovalsWidget,
        RecentActivityWidget,
        ProjectStatusWidget,
        ProjectExpenditureWidget,
        DepartmentPerformanceWidget
    ],
    
    template: `
        <div class="grid grid-cols-12 gap-6">
            <!-- Stats Cards Row -->
            <app-stats-widget></app-stats-widget>

            <!-- Charts Row -->
            <div class="col-span-12 xl:col-span-8">
                <app-project-expenditure-widget></app-project-expenditure-widget>
            </div>
            <div class="col-span-12 xl:col-span-4">
                <app-project-status-widget></app-project-status-widget>
            </div>

            <!-- Tables Row -->
            <div class="col-span-12 xl:col-span-8">
                <app-pending-approvals-widget></app-pending-approvals-widget>
            </div>
            <div class="col-span-12 xl:col-span-4">
                <app-recent-activity-widget></app-recent-activity-widget>
            </div>
        </div>
    `
})
export class Dashboard {}
