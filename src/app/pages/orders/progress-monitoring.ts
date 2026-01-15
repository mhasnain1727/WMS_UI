import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-progress-monitoring',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Progress Monitoring"
        description="Monitor project progress, milestones, and track execution status in real-time."
        icon="pi-chart-bar">
    </app-placeholder-page>`
})
export class ProgressMonitoring {}