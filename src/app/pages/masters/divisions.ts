import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-warehouses',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Divisions"
        description="Manage organizational divisions and their hierarchical structure."
        icon="pi-sitemap">
    </app-placeholder-page>`
})
export class Warehouses {}
