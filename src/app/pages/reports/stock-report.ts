import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-stock-report',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Project Reports"
        description="Comprehensive project status reports, timelines, and performance analytics."
        icon="pi-chart-bar">
    </app-placeholder-page>`
})
export class StockReport {}
