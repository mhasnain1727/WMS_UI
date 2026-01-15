import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-return-orders',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Contract Award"
        description="Manage contract awards, work order issuance, and contractor agreement processes."
        icon="pi-briefcase">
    </app-placeholder-page>`
})
export class ReturnOrders {}
