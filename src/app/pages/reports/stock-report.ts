import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-stock-report',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Stock Report"
        description="View current stock levels across all warehouses and locations."
        icon="pi-chart-bar">
    </app-placeholder-page>`
})
export class StockReport {}
