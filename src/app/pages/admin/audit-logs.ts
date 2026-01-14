import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-audit-logs',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Audit Logs"
        description="View system activity logs and track user actions for compliance."
        icon="pi-list">
    </app-placeholder-page>`
})
export class AuditLogs {}
