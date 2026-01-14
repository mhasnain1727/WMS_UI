import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-stock-adjustment',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Stock Adjustment"
        description="Adjust stock quantities for discrepancies, damages, or other corrections."
        icon="pi-sliders-h">
    </app-placeholder-page>`
})
export class StockAdjustment {}
