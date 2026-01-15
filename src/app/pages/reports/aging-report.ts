import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-aging-report',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Compliance Reports"
        description="Regulatory compliance tracking, audit reports, and quality assurance metrics."
        icon="pi-shield">
    </app-placeholder-page>`
})
export class AgingReport {}
