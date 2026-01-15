import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { authGuard } from './app/core/guards/auth.guard';

// Project Planning
import { Inventory } from './app/pages/inventory/estimate-preparation';
import { Inward } from './app/pages/inward/technical-sanctions';
import { Outward } from './app/pages/outward/draft-tender-papers';

// Master Data Management
import { Products } from './app/pages/masters/projects';
import { Categories } from './app/pages/masters/contractors';
import { Warehouses } from './app/pages/masters/divisions';
import { Locations } from './app/pages/masters/work-categories';
import { Suppliers } from './app/pages/masters/materials';
import { Customers } from './app/pages/masters/rate-analysis';

// Tender & Contract Management
import { TenderCreation } from './app/pages/orders/tender-creation';
import { BidEvaluation } from './app/pages/orders/bid-evaluation';
import { ContractAward } from './app/pages/orders/contract-award';

// Project Execution & Monitoring
import { WorkOrderManagement } from './app/pages/orders/work-order-management';
import { ProgressMonitoring } from './app/pages/orders/progress-monitoring';
import { EMeasurementBook } from './app/pages/orders/e-measurement-book';
import { EBilling } from './app/pages/orders/e-billing';

// Reports & Analytics
import { StockReport } from './app/pages/reports/stock-report';
import { InwardReport } from './app/pages/reports/inward-report';
import { OutwardReport } from './app/pages/reports/outward-report';
import { MovementReport } from './app/pages/reports/movement-report';
import { AgingReport } from './app/pages/reports/aging-report';

// System Administration
import { Users } from './app/pages/admin/users';
import { Roles } from './app/pages/admin/roles';
import { Settings } from './app/pages/admin/settings';
import { AuditLogs } from './app/pages/admin/audit-logs';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Landing },
    {
        path: '',
        component: AppLayout,
        canActivate: [authGuard],
        children: [
            // Dashboard
            { path: 'dashboard', component: Dashboard },

            // Project Planning
            { path: 'project-planning/estimate-preparation', component: Inventory },
            { path: 'project-planning/technical-sanctions', component: Inward },
            { path: 'project-planning/draft-tender-papers', component: Outward },

            // Master Data Management
            { path: 'masters/projects', component: Products },
            { path: 'masters/contractors', component: Categories },
            { path: 'masters/divisions', component: Warehouses },
            { path: 'masters/work-categories', component: Locations },
            { path: 'masters/materials', component: Suppliers },
            { path: 'masters/rate-analysis', component: Customers },

            // Tender & Contract Management
            { path: 'tender-management/tender-creation', component: TenderCreation },
            { path: 'tender-management/bid-evaluation', component: BidEvaluation },
            { path: 'tender-management/contract-award', component: ContractAward },

// Project Execution & Monitoring
{ path: 'project-execution/work-order-management', component: WorkOrderManagement },
{ path: 'project-execution/progress-monitoring', component: ProgressMonitoring },
{ path: 'project-execution/e-measurement-book', component: EMeasurementBook },
{ path: 'project-execution/e-billing', component: EBilling },

            // Reports & Analytics
            { path: 'reports/project-reports', component: StockReport },
            { path: 'reports/financial-reports', component: InwardReport },
            { path: 'reports/progress-reports', component: OutwardReport },
            { path: 'reports/contractor-performance', component: MovementReport },
            { path: 'reports/compliance-reports', component: AgingReport },

            // System Administration
            { path: 'admin/user-management', component: Users },
            { path: 'admin/roles-permissions', component: Roles },
            { path: 'admin/system-settings', component: Settings },
            { path: 'admin/audit-trail', component: AuditLogs }
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/home' }
];
