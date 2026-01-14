import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-movement-report',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Movement Report"
        description="Track stock movements including transfers and adjustments."
        icon="pi-history">
    </app-placeholder-page>`
})
export class MovementReport {}
