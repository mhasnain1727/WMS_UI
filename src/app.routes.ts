import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { authGuard } from './app/core/guards/auth.guard';

// Warehouse Operations
import { Inventory } from './app/pages/inventory/inventory';
import { Inward } from './app/pages/inward/inward';
import { Outward } from './app/pages/outward/outward';
import { StockTransfer } from './app/pages/stock-transfer/stock-transfer';
import { StockAdjustment } from './app/pages/stock-adjustment/stock-adjustment';

// Master Data
import { Products } from './app/pages/masters/products';
import { Categories } from './app/pages/masters/categories';
import { Warehouses } from './app/pages/masters/warehouses';
import { Locations } from './app/pages/masters/locations';
import { Suppliers } from './app/pages/masters/suppliers';
import { Customers } from './app/pages/masters/customers';
import { UOM } from './app/pages/masters/uom';

// Orders
import { PurchaseOrders } from './app/pages/orders/purchase-orders';
import { SalesOrders } from './app/pages/orders/sales-orders';
import { ReturnOrders } from './app/pages/orders/return-orders';

// Reports
import { StockReport } from './app/pages/reports/stock-report';
import { InwardReport } from './app/pages/reports/inward-report';
import { OutwardReport } from './app/pages/reports/outward-report';
import { MovementReport } from './app/pages/reports/movement-report';
import { AgingReport } from './app/pages/reports/aging-report';

// Admin
import { Users } from './app/pages/admin/users';
import { Roles } from './app/pages/admin/roles';
import { Settings } from './app/pages/admin/settings';
import { AuditLogs } from './app/pages/admin/audit-logs';

export const appRoutes: Routes = [
    { path: '', component: Landing },
    { path: 'landing', component: Landing },
    {
        path: '',
        component: AppLayout,
        canActivate: [authGuard],
        children: [
            // Dashboard
            { path: 'dashboard', component: Dashboard },

            // Warehouse Operations
            { path: 'inventory', component: Inventory },
            { path: 'inward', component: Inward },
            { path: 'outward', component: Outward },
            { path: 'stock-transfer', component: StockTransfer },
            { path: 'stock-adjustment', component: StockAdjustment },

            // Master Data
            { path: 'masters/products', component: Products },
            { path: 'masters/categories', component: Categories },
            { path: 'masters/warehouses', component: Warehouses },
            { path: 'masters/locations', component: Locations },
            { path: 'masters/suppliers', component: Suppliers },
            { path: 'masters/customers', component: Customers },
            { path: 'masters/uom', component: UOM },

            // Orders
            { path: 'orders/purchase', component: PurchaseOrders },
            { path: 'orders/sales', component: SalesOrders },
            { path: 'orders/returns', component: ReturnOrders },

            // Reports
            { path: 'reports/stock', component: StockReport },
            { path: 'reports/inward', component: InwardReport },
            { path: 'reports/outward', component: OutwardReport },
            { path: 'reports/movement', component: MovementReport },
            { path: 'reports/aging', component: AgingReport },

            // Administration
            { path: 'admin/users', component: Users },
            { path: 'admin/roles', component: Roles },
            { path: 'admin/settings', component: Settings },
            { path: 'admin/audit-logs', component: AuditLogs }
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
