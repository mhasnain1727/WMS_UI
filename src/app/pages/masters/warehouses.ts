import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-warehouses',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Warehouses"
        description="Configure and manage your warehouse facilities and their settings."
        icon="pi-building">
    </app-placeholder-page>`
})
export class Warehouses {}
