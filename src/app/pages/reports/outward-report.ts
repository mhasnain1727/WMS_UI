import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-outward-report',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Outward Report"
        description="Track dispatch history and outward transaction analytics."
        icon="pi-chart-pie">
    </app-placeholder-page>`
})
export class OutwardReport {}
