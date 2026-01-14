import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-stock-movement-widget',
    imports: [CommonModule, ChartModule, SelectModule, FormsModule],
    template: `
        <div class="card">
            <div class="flex items-center justify-between mb-6">
                <div class="font-semibold text-xl">Stock Movement</div>
                <p-select
                    [options]="periods"
                    [(ngModel)]="selectedPeriod"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Select Period"
                    class="w-32">
                </p-select>
            </div>
            <p-chart type="bar" [data]="chartData" [options]="chartOptions" class="w-full" style="height: 300px;"></p-chart>
        </div>
    `
})
export class StockMovementWidget implements OnInit {
    chartData: any;
    chartOptions: any;
    selectedPeriod = 'week';

    periods = [
        { label: 'This Week', value: 'week' },
        { label: 'This Month', value: 'month' },
        { label: 'This Year', value: 'year' }
    ];

    ngOnInit() {
        this.chartData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Inward',
                    backgroundColor: '#22c55e',
                    borderRadius: 4,
                    data: [450, 320, 540, 280, 620, 180, 90]
                },
                {
                    label: 'Outward',
                    backgroundColor: '#3b82f6',
                    borderRadius: 4,
                    data: [380, 450, 320, 490, 380, 220, 120]
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        };
    }
}
