import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }]
            },
            {
                label: 'Project Planning',
                items: [
                    { label: 'Estimate Preparation', icon: 'pi pi-fw pi-calculator', routerLink: ['/project-planning/estimate-preparation'] },
                    { label: 'Technical Sanctions', icon: 'pi pi-fw pi-check-circle', routerLink: ['/project-planning/technical-sanctions'] },
                    { label: 'Draft Tender Papers', icon: 'pi pi-fw pi-file-edit', routerLink: ['/project-planning/draft-tender-papers'] }
                ]
            },
            {
                label: 'Master Data Management',
                items: [
                    { label: 'Projects', icon: 'pi pi-fw pi-building', routerLink: ['/masters/projects'] },
                    { label: 'Contractors', icon: 'pi pi-fw pi-users', routerLink: ['/masters/contractors'] },
                    { label: 'Divisions', icon: 'pi pi-fw pi-sitemap', routerLink: ['/masters/divisions'] },
                    { label: 'Work Categories', icon: 'pi pi-fw pi-tags', routerLink: ['/masters/work-categories'] },
                    { label: 'Machinery', icon: 'pi pi-fw pi-cog', routerLink: ['/masters/machinery'] },
                    { label: 'Manpower', icon: 'pi pi-fw pi-id-card', routerLink: ['/masters/manpower'] },
                    { label: 'Equipments', icon: 'pi pi-fw pi-briefcase', routerLink: ['/masters/equipments'] },
                    { label: 'Rate Analysis', icon: 'pi pi-fw pi-chart-line', routerLink: ['/masters/rate-analysis'] }
                ]
            },
            {
                label: 'Tender & Contract Management',
                items: [
                    { label: 'Tender Creation', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/tender-management/tender-creation'] },
                    { label: 'Bid Evaluation', icon: 'pi pi-fw pi-search', routerLink: ['/tender-management/bid-evaluation'] },
                    { label: 'Contract Award', icon: 'pi pi-fw pi-briefcase', routerLink: ['/tender-management/contract-award'] }
                ]
            },
            {
                label: 'Project Execution & Monitoring',
                items: [
                    { label: 'Work Order Management', icon: 'pi pi-fw pi-play-circle', routerLink: ['/project-execution/work-order-management'] },
                    { label: 'Progress Monitoring', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/project-execution/progress-monitoring'] },
                    { label: 'E-Measurement Book', icon: 'pi pi-fw pi-book', routerLink: ['/project-execution/e-measurement-book'] },
                    { label: 'E-Billing', icon: 'pi pi-fw pi-money-bill', routerLink: ['/project-execution/e-billing'] }
                ]
            },
            {
                label: 'Reports & Analytics',
                items: [
                    { label: 'Project Reports', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/reports/project-reports'] },
                    { label: 'Financial Reports', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reports/financial-reports'] },
                    { label: 'Progress Reports', icon: 'pi pi-fw pi-chart-pie', routerLink: ['/reports/progress-reports'] },
                    { label: 'Contractor Performance', icon: 'pi pi-fw pi-star', routerLink: ['/reports/contractor-performance'] },
                    { label: 'Compliance Reports', icon: 'pi pi-fw pi-shield', routerLink: ['/reports/compliance-reports'] }
                ]
            },
            {
                label: 'System Administration',
                items: [
                    { label: 'User Management', icon: 'pi pi-fw pi-user', routerLink: ['/admin/user-management'] },
                    { label: 'Roles & Permissions', icon: 'pi pi-fw pi-lock', routerLink: ['/admin/roles-permissions'] },
                    { label: 'System Settings', icon: 'pi pi-fw pi-cog', routerLink: ['/admin/system-settings'] },
                    { label: 'Audit Trail', icon: 'pi pi-fw pi-list', routerLink: ['/admin/audit-trail'] }
                ]
            }
        ];
    }
}
