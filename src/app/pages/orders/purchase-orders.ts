import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-purchase-orders',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Purchase Orders"
        description="Create and manage purchase orders to suppliers for inventory replenishment."
        icon="pi-shopping-cart">
    </app-placeholder-page>`
})
export class PurchaseOrders {}
