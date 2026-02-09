import { Component } from '@angular/core';
import { PlaceholderPage } from '../../shared/components/placeholder-page';
import { ContractorDashboard } from "../dashboard/contractor-dashboard/contractor-dashboard";
import { ContractorProfile } from "../dashboard/contractor-dashboard/contractor-profile";

@Component({
    selector: 'app-customers',
    standalone: true,
    imports: [PlaceholderPage, ContractorDashboard, ContractorProfile],
    template: `<app-contractor-profile></app-contractor-profile>`
})
export class Customers {}
