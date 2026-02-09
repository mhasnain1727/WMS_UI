import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li
                    app-menuitem
                    *ngIf="!item.separator"
                    [item]="item"
                    [index]="i"
                    [root]="true">
                </li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
    `
})
export class AppMenu {

   
    role: 'ADMIN' | 'CONTRACTOR' = 'ADMIN'; // This should ideally come from an authentication service

    model: MenuItem[] = [];

    ngOnInit() {
        this.model = this.role === 'ADMIN'
            ? this.getAdminMenu()
            : this.getContractorMenu();
    }

    // 🟢 ADMIN MENU
    private getAdminMenu(): MenuItem[] {
        return [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
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

    // 🔵 CONTRACTOR MENU
    private getContractorMenu(): MenuItem[] {
        return [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/contractor/dashboard'] }
                ]
            },
            {
                label: 'My Profile',
                items: [
                    { label: 'Profile Details', icon: 'pi pi-fw pi-user', routerLink: ['/dashboard/contractor-dashboard/contractor-profile'] }
                ]
            },
            {
                label: 'My Work',
                items: [
                    { label: 'Work Orders', icon: 'pi pi-fw pi-play-circle', routerLink: ['/project-execution/work-order-management'] },
                    { label: 'Progress Monitoring', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/project-execution/progress-monitoring'] },
                    { label: 'E-Billing', icon: 'pi pi-fw pi-money-bill', routerLink: ['/project-execution/e-billing'] }
                ]
            }
        ];
    }
}
