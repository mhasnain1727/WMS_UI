import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-roles',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Roles & Permissions"
        description="Configure user roles and assign module-level permissions."
        icon="pi-lock">
    </app-placeholder-page>`
})
export class Roles {}
