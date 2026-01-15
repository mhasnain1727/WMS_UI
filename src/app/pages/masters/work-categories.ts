import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-locations',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Work Categories"
        description="Define and manage different categories of infrastructure work and projects."
        icon="pi-tags">
    </app-placeholder-page>`
})
export class Locations {}
