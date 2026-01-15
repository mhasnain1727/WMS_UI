import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-customers',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Rate Analysis"
        description="Manage rate analysis data, material costs, and pricing structures."
        icon="pi-chart-line">
    </app-placeholder-page>`
})
export class Customers {}
