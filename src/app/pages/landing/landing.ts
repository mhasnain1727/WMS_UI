import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';

interface ModuleInfo {
    id: number;
    title: string;
    description: string;
    details: string[];
}

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterModule, ButtonModule, DialogModule, RippleModule, CommonModule],
    template: `
        <div class="bg-surface-0 dark:bg-surface-900 min-h-screen">
            <!-- Header with Login Button -->
            <div class="bg-surface-50 dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700">
                <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <i class="pi pi-box text-3xl text-primary"></i>
                        <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">Work Management System</h1>
                    </div>
                    <p-button label="Login" icon="pi pi-sign-in" routerLink="/auth/login" [outlined]="true"></p-button>
                </div>
            </div>

            <!-- Main Content -->
            <div class="container mx-auto px-4 py-8">
                <!-- Introduction Section -->
                <div class="card mb-8">
                    <h2 class="text-3xl font-bold mb-4 text-surface-900 dark:text-surface-0">Scope of Work and Their Acceptance</h2>
                    
                    <h3 class="text-2xl font-semibold mt-6 mb-3 text-surface-900 dark:text-surface-0">INTRODUCTION</h3>
                    <p class="text-surface-700 dark:text-surface-300 mb-4 leading-relaxed">
                        Department is entrusted with the planning, design, construction, operation, and maintenance of various types of infrastructure projects under irrigation schemes. Every year, department invites numerous tenders for infrastructure development works, which are executed through registered contractors.
                    </p>
                    <p class="text-surface-700 dark:text-surface-300 mb-4 leading-relaxed">
                        For execution of any project, it is required to prepare an estimate of work and go through various checks till final approval. All these procedures are presently done as per Works Manual and Account Code. Main activities are estimating preparation in e-format and approval process till generation of DTP. In addition to these, higher authorities frequently require lot of information for Monitoring progress of project for policy formation process.
                    </p>
                    <p class="text-surface-700 dark:text-surface-300 mb-4 leading-relaxed">
                        Currently all these activities are performed manually in the conventional manner which is a time-consuming activity. The huge amount of time and human efforts are invested in manual environment which may in delays at different stages of project or may induce human mistakes which may directly either impact the entire project life cycle or lead to incorrect reporting. Ultimately the systems covered under Work Management System increase the overall efficiency of the department delivery process in its attempt to provide the best infrastructure facilities to its citizens of the state.
                    </p>
                    <p class="text-surface-700 dark:text-surface-300 leading-relaxed">
                        With this intent, this proposal is prepared to develop and deploy an integrated System for the department. The details of the various systems and modules along with the brief commercials involved are provided in this proposal.
                    </p>

                    <h3 class="text-2xl font-semibold mt-8 mb-4 text-surface-900 dark:text-surface-0">MODULES AND THEIR FUNCTIONAL REQUIREMENTS</h3>
                </div>

                <!-- Modules Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div 
                        *ngFor="let module of modules" 
                        class="card cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-surface-200 dark:border-surface-700 hover:border-primary"
                        (click)="openModuleDialog(module)"
                        pRipple
                    >
                        <div class="flex flex-col items-center justify-center h-full min-h-[200px] text-center p-4">
                            <div class="mb-4">
                                <div class="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-900 flex items-center justify-center mb-4 mx-auto">
                                    <i [class]="module.icon" class="text-3xl text-primary"></i>
                                </div>
                            </div>
                            <h4 class="text-xl font-bold mb-2 text-surface-900 dark:text-surface-0">{{ module.title }}</h4>
                            <p class="text-sm text-muted-color">{{ module.shortDescription }}</p>
                            <p-button label="View Details" [text]="true" icon="pi pi-arrow-right" iconPos="right" class="mt-4"></p-button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="bg-surface-50 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 mt-12">
                <div class="container mx-auto px-4 py-6 text-center text-surface-600 dark:text-surface-400">
                    <p>&copy; 2024 Work Management System. All rights reserved.</p>
                </div>
            </div>

            <!-- Module Details Dialog -->
            <p-dialog 
                [(visible)]="displayDialog" 
                [header]="selectedModule?.title" 
                [modal]="true" 
                [style]="{width: '90vw', maxWidth: '900px'}"
                [closable]="true"
                [draggable]="false"
                [blockScroll]="true"
            >
                <div *ngIf="selectedModule" class="module-details" style="max-height: 70vh; overflow-y: auto;">
                    <p class="text-surface-700 dark:text-surface-300 mb-4 leading-relaxed">{{ selectedModule.description }}</p>
                    <div class="mt-4">
                        <h4 class="font-semibold text-lg mb-3 text-surface-900 dark:text-surface-0">Functional Requirements:</h4>
                        <ul class="list-none p-0">
                            <li *ngFor="let detail of selectedModule.details; let i = index" class="mb-3 flex items-start">
                                <i class="pi pi-check-circle text-primary mr-3 mt-1 flex-shrink-0"></i>
                                <span class="text-surface-700 dark:text-surface-300 leading-relaxed">{{ i + 1 }}. {{ detail }}</span>
                            </li>
                        </ul>
            </div>
                </div>
            </p-dialog>
        </div>
    `
})
export class Landing {
    displayDialog = false;
    selectedModule: ModuleInfo | null = null;

    modules: (ModuleInfo & { icon: string; shortDescription: string })[] = [
        {
            id: 1,
            title: 'Module 1: Estimate Preparation & Technical Sanctions',
            icon: 'pi pi-calculator',
            shortDescription: 'Estimate preparation, approvals, rate analyses, and technical sanctions',
            description: 'Facility for estimate preparation, approvals, rate analyses, and technical sanctions including quarry map upload, lead statement preparation, rate analysis, design drawing upload, cost estimates, SOR management, and technical sanction generation.',
            details: [
                'Facility to upload approved quarry map',
                'Facility to prepare or upload approved lead statement',
                'Facility to approve lead statement from competent authority',
                'Facility to prepare or upload approved rate analysis of Non DSR/CSR items',
                'Facility to maintain database of all Non DSR items & their RA',
                'Facility to upload design drawing received from design offices',
                'Preparation of Cost Estimates & According Technical Sanctions',
                'Facility to prepare SOR for basic rates of different items',
                'Facility to upload Schedule of Rate (SOR) and to capture rates',
                'Provide detailed Rate Analysis (RA) module',
                'Estimation preparation module with facility to enter work quantity',
                'Facility to generate Detail of measurement in LBH format',
                'Facility to calculate quantities for elements using different formulae',
                'Facility to import measurements in excel format',
                'Facility for preparation of detailed estimates and proposal',
                'Facility to upload and view structural and all type of drawings',
                'Facility to send online detailed estimates to competent authority',
                'Facility to prepare Abstract and recapitulation sheet automatically',
                'Well defined route for preparation, submission and approval of estimate',
                'Facility to auto generate Technical Sanction Order & allot TS number',
                'Facility to add Digital signature in documents',
                'Facility to prepare estimates in Offline stage & upload when connected'
            ]
        },
        {
            id: 2,
            title: 'Module 2: Draft Tender Papers (DTP)',
            icon: 'pi pi-file-edit',
            shortDescription: 'Draft Tender Papers preparation and approval',
            description: 'Facility to prepare DTP for various types of tenders, generate Schedule A and B, manage BoQ, add contract conditions, prepare tender notices, and manage approval workflow.',
            details: [
                'Facility to prepare DTP for various types of tenders',
                'Facility to generate Schedule \'A\' and \'B\' from technically sanctioned estimate',
                'Facility in BoQ for clubbing and calculation of weighted average',
                'Facility for adding or uploading General and special conditions of contract',
                'Facility to add or upload all applicable standard specifications',
                'Facility for preparation of detailed tender notice/e-tender notice',
                'Facility to link and view structural and all type of drawings',
                'Facility to send DTP online to competent authority for approval',
                'Facility to enable competent authority to Approve/Reject/Comment on DTP',
                'Facility to send auto generated mails/SMS alerts to competent authorities'
            ]
        },
        {
            id: 3,
            title: 'Module 3: Contractor Management',
            icon: 'pi pi-users',
            shortDescription: 'Contractor registration and management',
            description: 'Complete contractor management system including registration, search, blacklisting/whitelisting, performance tracking, renewal reminders, online applications, and certificate generation.',
            details: [
                'Facility to Register Contractor',
                'Facility to search contractor based on various criteria',
                'Facility to generate contractor registration certificate',
                'Facility to search and Blacklisting / whitelisting of contractors',
                'Facility to search Contractor\'s performance record',
                'Renewal reminders on dashboard page for Head Clerk',
                'Online application by contractors (including fees collection if allowed)',
                'Online application with DSC',
                'Review of contractor application',
                'Online Download of contractor registration certificate during validity period',
                'PAN / Aadhar based data management of contractors',
                'Auto-Validation of classes of contractors'
            ]
        },
        {
            id: 4,
            title: 'Module 4: Tender Creation & Evaluation',
            icon: 'pi pi-briefcase',
            shortDescription: 'Tender creation, evaluation, and grievances management',
            description: 'Comprehensive tender management system including contractor master data, tender creation, evaluation, bid evaluation, grievance resolution, and technical closure.',
            details: [
                'Contractor Master Data and Approvals management',
                'Client Users management with roles (EE, SE, HQ Committee)',
                'Allow creation of tenders (planned works) on system',
                'Facility to enter tender requirements and financial requirements',
                'Facility to select tender type (T1/T2/MBD/SBD/CBD)',
                'Manage tenders according to type of tender',
                'Allow enter specific data from contractor for each tender',
                'Bid Evaluation with auto evaluation by system',
                'Facility to open technical bid by using DSC',
                'Auto-creation of comparison chart',
                'Auto calculation of bid capacity',
                'Grievance Resolution facility',
                'Technical Closure with finalisation sheet generation'
            ]
        },
        {
            id: 5,
            title: 'Module 5: Contract Management & Works Monitoring',
            icon: 'pi pi-chart-line',
            shortDescription: 'Contract management and works progress monitoring',
            description: 'Post-tendering management, contract award, work order generation, physical and financial progress monitoring, alerts, and completion certificate generation.',
            details: [
                'Facility to add successful bidder in system',
                'Facility to auto generate Contract Id (Work ID)',
                'Facility to accept SD (by giving link for online payment gateway)',
                'Facility to issue digitally signed work order online',
                'Facility to give automatic alert for issued of work order',
                'Facility to upload signed contract copy',
                'Facility to generate monthly/quarterly/yearly progress reports',
                'Facility to give SMS/Email based alerts for slippages',
                'Facility to monitor Contractor billing status',
                'Facility to check executed quantities within limit of tender quantities',
                'Facility to generate alerts if completion date is exceeded',
                'Facility to add/upload sanctioned proposal of extension of time',
                'Facility to generate completion certificate and Performance certificate',
                'Facility to generate Refund of SD / other deposits'
            ]
        },
        {
            id: 6,
            title: 'Module 6: E-MB (Electronic Measurement Book)',
            icon: 'pi pi-book',
            shortDescription: 'Online measurement book preparation',
            description: 'Electronic Measurement Book system for recording measurements, linking to approved estimates, maintaining records, and ensuring security.',
            details: [
                'Facility to prepare online measurement book for specific work',
                'Facility to generate single MB for one work',
                'Facility to generate system generated MB number',
                'Facility to link it to Approved Estimate and BOQ of work',
                'Facility to add measurements in MB from approved estimate',
                'Facility to import measurements in excel format',
                'Facility to enter and maintain record entries of items',
                'Facility to add Detail of measurement in LBH format',
                'Facility to add quantities using different formulae',
                'Facility to add name and designation of measurement\'s recording authority',
                'Facility to add quantities of items from approved schedule',
                'Facility to record MB for newly started work',
                'Facility to record MB for already started works',
                'Provision of certification of claims by Authority Engineer',
                'Appropriate security provision for non-tampering of MB'
            ]
        },
        {
            id: 7,
            title: 'Module 7: E-BILLING',
            icon: 'pi pi-money-bill',
            shortDescription: 'Electronic billing and payment processing',
            description: 'Comprehensive e-billing system for bill preparation, passing, payment processing, deductions, recoveries, and payment workflow management.',
            details: [
                'Facility for Preparation of bills and Passing of bills',
                'Facility to auto populate items from approved Schedule',
                'Facility to generate running Bill based on detailed measurement',
                'Facility to generate final bill with summary',
                'Facility to make payment for quantities in different categories',
                'System shall not allow payment beyond permissible limit',
                'Facility to allow payment for quantities approved in Variation',
                'Facility to make payment by reduced rate for items',
                'Facility to make payment by part rate for items',
                'Facility to add secured advances in bill',
                'Facility to recover secured advances in consequent bills',
                'Facility to calculate price escalation',
                'Well defined route for preparation, submission, scrutiny, approval',
                'System shall auto calculate all deductions',
                'Facility to allow competent authority to withheld amount',
                'Facility to Upload Quality Control results/ royalty challans',
                'System shall maintain record of important correspondence'
            ]
        },
        {
            id: 8,
            title: 'Module 8: Project Management',
            icon: 'pi pi-sitemap',
            shortDescription: 'Project planning and progress tracking',
            description: 'Project management system with project planning, Gantt charts, progress tracking, delay reports, and consolidated reporting.',
            details: [
                'Facility to create a project plan based on BOQ items',
                'Facility to Manage SS, SE, ES, EE Relationships of works',
                'Facility to enter resources required as per plan',
                'Facility to Reshuffle the sequence',
                'Facility to show progress of work',
                'Creation of Gantt chart',
                'Actual vs Planned execution report',
                'Comparison and delay reports',
                'Iterations of Project Plans',
                'Facility to view consolidated report of project',
                'Access control of Project management features',
                'Auto-reminders based on project plan'
            ]
        },
        {
            id: 9,
            title: 'Module 9: Employee Management',
            icon: 'pi pi-user',
            shortDescription: 'Employee data and access management',
            description: 'Employee management system for managing employee data, DSC attachment, password management, and security logging.',
            details: [
                'Facility to Add / Edit employee data',
                'Facility to attach DSC to employee profile',
                'Facility to reset password',
                'Logging of security actions like logon/log off and change password',
                'View employee logs'
            ]
        },
        {
            id: 10,
            title: 'Module 10: Document & Image Management',
            icon: 'pi pi-folder',
            shortDescription: 'Document repository and management system',
            description: 'Comprehensive document and image management system with tagging, version control, repository, and search capabilities.',
            details: [
                'Facility to upload documents related to project',
                'Facility to Tag the documents with relevant multiple tags',
                'Version management facility for same names documents',
                'Make a single repository of documents for any project',
                'Search facility based on name / tag / project / document type'
            ]
        }
    ];

    openModuleDialog(module: ModuleInfo & { icon: string; shortDescription: string }): void {
        this.selectedModule = module;
        this.displayDialog = true;
    }
}
