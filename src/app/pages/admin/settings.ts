import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="System Settings"
        description="Configure system-wide settings, preferences, and defaults."
        icon="pi-cog">
    </app-placeholder-page>`
})
export class Settings {}
