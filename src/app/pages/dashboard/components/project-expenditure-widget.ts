import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-project-expenditure-widget',
    imports: [CommonModule, ChartModule, SelectModule, FormsModule],
    template: `
        <div class="card h-full">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div class="font-semibold text-xl">Project Expenditure</div>
                <p-select
                    [options]="periods"
                    [(ngModel)]="selectedPeriod"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Select Period"
                    class="w-full sm:w-40">
                </p-select>
            </div>
            <div class="w-full" style="min-height: 320px;">
                <p-chart type="bar" [data]="chartData" [options]="chartOptions" [responsive]="true" class="w-full h-full"></p-chart>
            </div>
        </div>
    `
})
export class ProjectExpenditureWidget implements OnInit {
    chartData: any;
    chartOptions: any;
    selectedPeriod = 'month';
    platformId = inject(PLATFORM_ID);

    periods = [
        { label: 'This Month', value: 'month' },
        { label: 'This Quarter', value: 'quarter' },
        { label: 'This Year', value: 'year' }
    ];

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        const documentStyle = isPlatformBrowser(this.platformId) ? getComputedStyle(document.documentElement) : null;
        const textColor = documentStyle?.getPropertyValue('--text-color') || '#495057';
        const textColorSecondary = documentStyle?.getPropertyValue('--text-color-secondary') || '#6c757d';
        const surfaceBorder = documentStyle?.getPropertyValue('--surface-border') || '#dfe7ef';

        this.chartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Budgeted',
                    backgroundColor: '#22c55e',
                    borderRadius: 6,
                    barThickness: 'flex',
                    maxBarThickness: 32,
                    data: [2500000, 3200000, 2800000, 3500000, 2900000, 3800000]
                },
                {
                    label: 'Actual',
                    backgroundColor: '#3b82f6',
                    borderRadius: 6,
                    barThickness: 'flex',
                    maxBarThickness: 32,
                    data: [2400000, 3100000, 2950000, 3400000, 2750000, 3650000]
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                        color: textColor,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    },
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            size: 11
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            }
        };
    }
}