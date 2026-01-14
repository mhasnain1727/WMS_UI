import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Categories"
        description="Manage product categories and sub-categories for better organization."
        icon="pi-tags">
    </app-placeholder-page>`
})
export class Categories {}
