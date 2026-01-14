import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-locations',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Locations"
        description="Define storage locations within warehouses - racks, bins, and zones."
        icon="pi-map-marker">
    </app-placeholder-page>`
})
export class Locations {}
