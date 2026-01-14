import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
    standalone: true,
    selector: 'app-warehouse-stock-widget',
    imports: [CommonModule, ChartModule],
    template: `
        <div class="card">
            <div class="font-semibold text-xl mb-6">Stock by Warehouse</div>
            <p-chart type="doughnut" [data]="chartData" [options]="chartOptions" class="w-full" style="height: 300px;"></p-chart>
            <div class="flex flex-col gap-4 mt-6">
                <div *ngFor="let item of warehouseData" class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full" [style.backgroundColor]="item.color"></span>
                        <span class="font-medium">{{ item.name }}</span>
                    </div>
                    <span class="text-muted-color">{{ item.value | number }} units</span>
                </div>
            </div>
        </div>
    `
})
export class WarehouseStockWidget implements OnInit {
    chartData: any;
    chartOptions: any;

    warehouseData = [
        { name: 'Main Warehouse', value: 25400, color: '#3b82f6' },
        { name: 'Branch Warehouse A', value: 12300, color: '#22c55e' },
        { name: 'Branch Warehouse B', value: 7530, color: '#f59e0b' }
    ];

    ngOnInit() {
        this.chartData = {
            labels: this.warehouseData.map(w => w.name),
            datasets: [
                {
                    data: this.warehouseData.map(w => w.value),
                    backgroundColor: this.warehouseData.map(w => w.color),
                    hoverBackgroundColor: this.warehouseData.map(w => w.color + 'dd'),
                    borderWidth: 0
                }
            ]
        };

        this.chartOptions = {
            cutout: '60%',
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            maintainAspectRatio: false
        };
    }
}
