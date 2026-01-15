import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-e-billing',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="E-Billing"
        description="Electronic billing system for contractor payments, progress claims, and financial settlements."
        icon="pi-money-bill">
    </app-placeholder-page>`
})
export class EBilling {}