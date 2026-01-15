import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-bid-evaluation',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Bid Evaluation"
        description="Evaluate contractor bids, perform technical and financial analysis, and recommend awards."
        icon="pi-search">
    </app-placeholder-page>`
})
export class BidEvaluation {}