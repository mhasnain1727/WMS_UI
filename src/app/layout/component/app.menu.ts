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
                    { label: 'Receiving', icon: 'pi pi-fw pi-inbox', routerLink: ['/receiving'] },
                    { label: 'Shipping', icon: 'pi pi-fw pi-send', routerLink: ['/shipping'] },
                    { label: 'Stock Transfer', icon: 'pi pi-fw pi-arrows-h', routerLink: ['/stock-transfer'] }
                ]
            },
            {
                label: 'Master Data',
                items: [
                    { label: 'Products', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/products'] },
                    { label: 'Locations', icon: 'pi pi-fw pi-map-marker', routerLink: ['/locations'] },
                    { label: 'Suppliers', icon: 'pi pi-fw pi-building', routerLink: ['/suppliers'] },
                    { label: 'Customers', icon: 'pi pi-fw pi-users', routerLink: ['/customers'] }
                ]
            },
            {
                label: 'Reports',
                items: [
                    { label: 'Inventory Reports', icon: 'pi pi-fw pi-file', routerLink: ['/reports/inventory'] },
                    { label: 'Transaction Reports', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/reports/transactions'] }
                ]
            },
            {
                label: 'System',
                items: [
                    { label: 'Users', icon: 'pi pi-fw pi-user', routerLink: ['/system/users'] },
                    { label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: ['/system/settings'] }
                ]
            }
        ];
    }
}
