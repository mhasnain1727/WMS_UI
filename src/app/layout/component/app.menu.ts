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
                label: 'Warehouse Operations',
                items: [
                    { label: 'Inventory', icon: 'pi pi-fw pi-box', routerLink: ['/inventory'] },
                    { label: 'Inward', icon: 'pi pi-fw pi-sign-in', routerLink: ['/inward'] },
                    { label: 'Outward', icon: 'pi pi-fw pi-sign-out', routerLink: ['/outward'] },
                    { label: 'Stock Transfer', icon: 'pi pi-fw pi-arrows-h', routerLink: ['/stock-transfer'] },
                    { label: 'Stock Adjustment', icon: 'pi pi-fw pi-sliders-h', routerLink: ['/stock-adjustment'] }
                ]
            },
            {
                label: 'Master Data',
                items: [
                    { label: 'Products', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/masters/products'] },
                    { label: 'Categories', icon: 'pi pi-fw pi-tags', routerLink: ['/masters/categories'] },
                    { label: 'Warehouses', icon: 'pi pi-fw pi-building', routerLink: ['/masters/warehouses'] },
                    { label: 'Locations', icon: 'pi pi-fw pi-map-marker', routerLink: ['/masters/locations'] },
                    { label: 'Suppliers', icon: 'pi pi-fw pi-truck', routerLink: ['/masters/suppliers'] },
                    { label: 'Customers', icon: 'pi pi-fw pi-users', routerLink: ['/masters/customers'] },
                    { label: 'Units of Measure', icon: 'pi pi-fw pi-calculator', routerLink: ['/masters/uom'] }
                ]
            },
            {
                label: 'Orders',
                items: [
                    { label: 'Purchase Orders', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/orders/purchase'] },
                    { label: 'Sales Orders', icon: 'pi pi-fw pi-file-export', routerLink: ['/orders/sales'] },
                    { label: 'Return Orders', icon: 'pi pi-fw pi-replay', routerLink: ['/orders/returns'] }
                ]
            },
            {
                label: 'Reports',
                items: [
                    { label: 'Stock Report', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/reports/stock'] },
                    { label: 'Inward Report', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reports/inward'] },
                    { label: 'Outward Report', icon: 'pi pi-fw pi-chart-pie', routerLink: ['/reports/outward'] },
                    { label: 'Movement Report', icon: 'pi pi-fw pi-history', routerLink: ['/reports/movement'] },
                    { label: 'Aging Report', icon: 'pi pi-fw pi-clock', routerLink: ['/reports/aging'] }
                ]
            },
            {
                label: 'Administration',
                items: [
                    { label: 'Users', icon: 'pi pi-fw pi-user', routerLink: ['/admin/users'] },
                    { label: 'Roles & Permissions', icon: 'pi pi-fw pi-lock', routerLink: ['/admin/roles'] },
                    { label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: ['/admin/settings'] },
                    { label: 'Audit Logs', icon: 'pi pi-fw pi-list', routerLink: ['/admin/audit-logs'] }
                ]
            }
        ];
    }
}
