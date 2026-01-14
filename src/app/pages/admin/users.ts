import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="User Management"
        description="Manage user accounts, reset passwords, and control access."
        icon="pi-user">
    </app-placeholder-page>`
})
export class Users {}
