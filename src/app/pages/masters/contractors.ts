import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Contractors"
        description="Manage contractor registration, classification, and performance tracking."
        icon="pi-users">
    </app-placeholder-page>`
})
export class Categories {}
