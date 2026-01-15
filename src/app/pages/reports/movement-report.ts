import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-movement-report',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Contractor Performance"
        description="Contractor evaluation metrics, completion rates, and performance tracking."
        icon="pi-star">
    </app-placeholder-page>`
})
export class MovementReport {}
