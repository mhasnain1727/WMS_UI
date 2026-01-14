import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsWidget } from './components/statswidget';
import { LowStockWidget } from './components/lowstockwidget';
import { RecentActivityWidget } from './components/recentactivitywidget';
import { WarehouseStockWidget } from './components/warehousestockwidget';
import { StockMovementWidget } from './components/stockmovementwidget';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        StatsWidget,
        LowStockWidget,
        RecentActivityWidget,
        WarehouseStockWidget,
        StockMovementWidget
    ],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <!-- Stats Cards -->
            <app-stats-widget></app-stats-widget>

            <!-- Stock Movement Chart -->
            <div class="col-span-12 xl:col-span-8">
                <app-stock-movement-widget></app-stock-movement-widget>
            </div>

            <!-- Warehouse Stock Distribution -->
            <div class="col-span-12 xl:col-span-4">
                <app-warehouse-stock-widget></app-warehouse-stock-widget>
            </div>

            <!-- Low Stock Alerts -->
            <div class="col-span-12 xl:col-span-8">
                <app-low-stock-widget></app-low-stock-widget>
            </div>

            <!-- Recent Activity -->
            <div class="col-span-12 xl:col-span-4">
                <app-recent-activity-widget></app-recent-activity-widget>
            </div>
        </div>
    `
})
export class Dashboard {}
