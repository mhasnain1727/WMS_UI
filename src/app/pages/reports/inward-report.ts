import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-inward-report',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Inward Report"
        description="Analyze goods received notes and inward transaction history."
        icon="pi-chart-line">
    </app-placeholder-page>`
})
export class InwardReport {}
