import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-work-order-management',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Work Order Management"
        description="Create and manage work orders for government infrastructure projects and track execution."
        icon="pi-play-circle">
    </app-placeholder-page>`
})
export class WorkOrderManagement {}