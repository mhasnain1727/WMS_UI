import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';
import { ContractorDashboard } from "../dashboard/contractor-dashboard/contractor-dashboard";

@Component({
    selector: 'app-customers',
    standalone: true,
    imports: [PlaceholderPage, ContractorDashboard],
    template: `<app-contractor-dashboard></app-contractor-dashboard>`
})
export class Customers {}
