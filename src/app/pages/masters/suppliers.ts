import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-suppliers',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Suppliers"
        description="Manage supplier information, contact details, and purchase history."
        icon="pi-truck">
    </app-placeholder-page>`
})
export class Suppliers {}
