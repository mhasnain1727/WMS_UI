import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-e-measurement-book',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="E-Measurement Book"
        description="Digital measurement book for recording work progress, quantities, and quality control."
        icon="pi-book">
    </app-placeholder-page>`
})
export class EMeasurementBook {}