import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-uom',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Units of Measure"
        description="Define units of measurement and conversion factors for products."
        icon="pi-calculator">
    </app-placeholder-page>`
})
export class UOM {}
