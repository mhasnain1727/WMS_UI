import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-return-orders',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Return Orders"
        description="Handle product returns from customers and manage return processing."
        icon="pi-replay">
    </app-placeholder-page>`
})
export class ReturnOrders {}
