import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-customers',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Customers"
        description="Manage customer profiles, contact information, and sales records."
        icon="pi-users">
    </app-placeholder-page>`
})
export class Customers {}
