import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-suppliers',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Materials"
        description="Manage construction materials, specifications, and pricing information."
        icon="pi-box">
    </app-placeholder-page>`
})
export class Suppliers {}
