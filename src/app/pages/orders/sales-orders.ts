import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-sales-orders',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Sales Orders"
        description="Manage customer sales orders and track order fulfillment status."
        icon="pi-file-export">
    </app-placeholder-page>`
})
export class SalesOrders {}
