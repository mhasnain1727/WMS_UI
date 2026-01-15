import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';

@Component({
    selector: 'app-tender-creation',
    standalone: true,
    imports: [PlaceholderPage],
    template: `<app-placeholder-page
        title="Tender Creation"
        description="Create and publish tenders for government infrastructure projects and manage tender requirements."
        icon="pi-plus-circle">
    </app-placeholder-page>`
})
export class TenderCreation {}