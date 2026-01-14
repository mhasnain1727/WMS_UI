import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-stock-transfer',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Stock Transfer"
        description="Transfer stock between warehouses and locations. Track inter-warehouse movements."
        icon="pi-arrows-h">
    </app-placeholder-page>`
})
export class StockTransfer {}
