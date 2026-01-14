import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-aging-report',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Aging Report"
        description="Identify slow-moving and aging inventory for better stock management."
        icon="pi-clock">
    </app-placeholder-page>`
})
export class AgingReport {}
