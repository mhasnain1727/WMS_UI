import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-inward-report',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Financial Reports"
        description="Budget vs actual expenditure, payment tracking, and financial performance analysis."
        icon="pi-chart-line">
    </app-placeholder-page>`
})
export class InwardReport {}
