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
    icon?: string;
    shortDescription?: string;
}

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterModule, ButtonModule, DialogModule, RippleModule, CommonModule],
    template: `
        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-surface-900 dark:via-surface-950 dark:to-surface-900 min-h-screen">
            <!-- Hero Section -->
            <div class="relative overflow-hidden">
                <!-- Background Pattern -->
                <div class="absolute inset-0 opacity-5 dark:opacity-10">
                    <div class="absolute top-20 left-20">
                        <i class="pi pi-building text-9xl text-primary"></i>
                    </div>
                    <div class="absolute top-40 right-32">
                        <i class="pi pi-chart-line text-7xl text-primary-400"></i>
                    </div>
                    <div class="absolute bottom-32 left-40">
                        <i class="pi pi-users text-8xl text-primary-300"></i>
                    </div>
                    <div class="absolute bottom-20 right-20">
                        <i class="pi pi-file-text text-6xl text-primary-500"></i>
                    </div>
                </div>

                <!-- Header -->
                <div class="relative bg-white/80 dark:bg-surface-900/80 backdrop-blur-sm border-b border-white/20 dark:border-surface-700/50">
                    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-gradient-to-r from-primary to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                                <i class="pi pi-building text-white text-xl"></i>
                            </div>
                            <div>
                                <h1 class="text-2xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">Work Management System</h1>
                                <p class="text-xs text-surface-600 dark:text-surface-400">Infrastructure Management Portal</p>
                            </div>
                        </div>
                        <p-button label="Login" icon="pi pi-sign-in" routerLink="/auth/login" styleClass="bg-gradient-to-r from-primary to-primary-600 border-none shadow-lg hover:shadow-xl transition-all duration-300"></p-button>
                    </div>
                </div>

                <!-- Hero Content -->
                <div class="relative container mx-auto px-4 py-8 lg:py-12">
                    <div class="max-w-4xl mx-auto text-center">
                        <div class="inline-flex items-center px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-3 border border-primary/20">
                            <i class="pi pi-star-fill text-primary mr-2"></i>
                            <span class="text-sm font-medium text-primary">Comprehensive Infrastructure Management</span>
                        </div>

                        <h1 class="text-4xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-surface-900 via-primary to-surface-800 dark:from-white dark:via-primary-300 dark:to-surface-200 bg-clip-text text-transparent leading-tight">
                            Transform Infrastructure<br>Project Management
                        </h1>

                        <p class="text-xl text-surface-600 dark:text-surface-300 mb-4 leading-relaxed">
                            Streamline your department's workflow with our integrated Work Management System. From estimate preparation to project completion, manage every aspect of infrastructure development efficiently.
                        </p>

                        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                            <p-button label="Explore Modules" icon="pi pi-arrow-down" (click)="scrollToModules()" styleClass="bg-gradient-to-r from-primary to-primary-600 border-none shadow-lg hover:shadow-xl px-8 py-3 text-lg"></p-button>
                            <p-button label="Get Started" icon="pi pi-play" routerLink="/auth/login" [outlined]="true" styleClass="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 text-lg"></p-button>
                        </div>

                        <!-- Stats -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                            <div class="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 dark:border-surface-700/50">
                                <div class="text-2xl font-bold text-primary mb-1">10+</div>
                                <div class="text-sm text-surface-600 dark:text-surface-400">Core Modules</div>
                            </div>
                            <div class="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 dark:border-surface-700/50">
                                <div class="text-2xl font-bold text-primary mb-1">100+</div>
                                <div class="text-sm text-surface-600 dark:text-surface-400">Features</div>
                            </div>
                            <div class="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 dark:border-surface-700/50">
                                <div class="text-2xl font-bold text-primary mb-1">24/7</div>
                                <div class="text-sm text-surface-600 dark:text-surface-400">Support</div>
                            </div>
                            <div class="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 dark:border-surface-700/50">
                                <div class="text-2xl font-bold text-primary mb-1">SSL</div>
                                <div class="text-sm text-surface-600 dark:text-surface-400">Secured</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="container mx-auto px-4 py-16">
                <!-- Introduction Section -->
                <div class="max-w-6xl mx-auto mb-8">
                    <div class="bg-white dark:bg-surface-800 rounded-2xl shadow-xl border border-surface-200 dark:border-surface-700 overflow-hidden">
                        <div class="bg-gradient-to-r from-primary to-primary-600 p-6 text-white">
                            <h2 class="text-3xl font-bold mb-2">Scope of Work and Their Acceptance</h2>
                            <p class="text-primary-100">Comprehensive system overview and module specifications</p>
                        </div>

                        <div class="p-6">
                            <div class="grid md:grid-cols-3 gap-8 mb-8">
                                <div class="text-center">
                                    <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i class="pi pi-building text-3xl text-primary"></i>
                                    </div>
                                    <h3 class="font-semibold text-lg mb-2">Planning & Design</h3>
                                    <p class="text-sm text-surface-600 dark:text-surface-400">Infrastructure project planning and design management</p>
                                </div>
                                <div class="text-center">
                                    <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i class="pi pi-users text-3xl text-primary"></i>
                                    </div>
                                    <h3 class="font-semibold text-lg mb-2">Contract Management</h3>
                                    <p class="text-sm text-surface-600 dark:text-surface-400">Contractor registration and tender management</p>
                                </div>
                                <div class="text-center">
                                    <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i class="pi pi-chart-line text-3xl text-primary"></i>
                                    </div>
                                    <h3 class="font-semibold text-lg mb-2">Progress Monitoring</h3>
                                    <p class="text-sm text-surface-600 dark:text-surface-400">Real-time project monitoring and reporting</p>
                                </div>
                            </div>

                            <h3 class="text-2xl font-semibold mt-8 mb-6 text-surface-900 dark:text-surface-0 flex items-center">
                                <i class="pi pi-info-circle text-primary mr-3"></i>
                                INTRODUCTION
                            </h3>

                            <div class="space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed">
                                <p class="text-lg">
                                    Department is entrusted with the planning, design, construction, operation, and maintenance of various types of infrastructure projects under irrigation schemes. Every year, department invites numerous tenders for infrastructure development works, which are executed through registered contractors.
                                </p>
                                <p class="text-lg">
                                    For execution of any project, it is required to prepare an estimate of work and go through various checks till final approval. All these procedures are presently done as per Works Manual and Account Code. Main activities are estimating preparation in e-format and approval process till generation of DTP. In addition to these, higher authorities frequently require lot of information for Monitoring progress of project for policy formation process.
                                </p>
                                <p class="text-lg">
                                    Currently all these activities are performed manually in the conventional manner which is a time-consuming activity. The huge amount of time and human efforts are invested in manual environment which may in delays at different stages of project or may induce human mistakes which may directly either impact the entire project life cycle or lead to incorrect reporting. Ultimately the systems covered under Work Management System increase the overall efficiency of the department delivery process in its attempt to provide the best infrastructure facilities to its citizens of the state.
                                </p>
                                <p class="text-lg">
                                    With this intent, this proposal is prepared to develop and deploy an integrated System for the department. The details of the various systems and modules along with the brief commercials involved are provided in this proposal.
                                </p>
                            </div>

                            <div class="mt-12 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                                <h3 class="text-2xl font-semibold mb-4 text-surface-900 dark:text-surface-0 flex items-center">
                                    <i class="pi pi-list text-primary mr-3"></i>
                                    MODULES AND THEIR FUNCTIONAL REQUIREMENTS
                                </h3>
                                <p class="text-surface-600 dark:text-surface-400">
                                    Explore our comprehensive suite of 10 specialized modules designed to streamline every aspect of infrastructure project management.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modules Grid -->
                <div class="max-w-7xl mx-auto">
                    <div class="text-center mb-6">
                        <h2 id="modules" class="text-3xl font-bold mb-4 bg-gradient-to-r from-surface-900 to-primary dark:from-white dark:to-primary-300 bg-clip-text text-transparent">
                            System Modules
                        </h2>
                        <p class="text-lg text-surface-600 dark:text-surface-400 text-center">
                            Discover our comprehensive suite of specialized modules designed to transform your infrastructure management workflow
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <div
                            *ngFor="let module of modules; let i = index"
                            class="group bg-white dark:bg-surface-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-surface-200 dark:border-surface-700 hover:border-primary overflow-hidden cursor-pointer transform hover:-translate-y-2"
                            (click)="openModuleDialog(module)"
                            pRipple
                        >
                            <div class="relative p-6 h-full flex flex-col">
                                <!-- Module Number Badge -->
                                <div class="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span class="text-sm font-bold text-primary">{{ i + 1 }}</span>
                                </div>

                                <!-- Icon -->
                                <div class="mb-6">
                                    <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <i [class]="module.icon" class="text-4xl text-primary"></i>
                                    </div>
                                </div>

                                <!-- Content -->
                                <div class="flex-1">
                                    <h4 class="text-xl font-bold mb-3 text-surface-900 dark:text-surface-0 group-hover:text-primary transition-colors duration-300">
                                        {{ module.title.split(':')[1] || module.title }}
                                    </h4>
                                    <p class="text-sm text-surface-600 dark:text-surface-400 leading-relaxed mb-4">
                                        {{ module.shortDescription }}
                                    </p>
                                </div>

                                <!-- Action -->
                                <div class="flex items-center justify-between mt-4">
                                    <span class="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                                        View Details
                                    </span>
                                    <i class="pi pi-arrow-right text-primary group-hover:translate-x-1 transition-transform duration-300"></i>
                                </div>

                                <!-- Hover Effect Overlay -->
                                <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="bg-gradient-to-r from-surface-900 to-surface-800 dark:from-surface-950 dark:to-surface-900 border-t border-surface-700/50 mt-8">
                <div class="container mx-auto px-4 py-12">
                    <div class="grid md:grid-cols-4 gap-8 mb-8">
                        <div class="md:col-span-2">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-12 h-12 bg-gradient-to-r from-primary to-primary-600 rounded-xl flex items-center justify-center">
                                    <i class="pi pi-building text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-white">Work Management System</h3>
                                    <p class="text-surface-400 text-sm">Infrastructure Management Portal</p>
                                </div>
                            </div>
                            <p class="text-surface-300 mb-4 leading-relaxed">
                                Transforming infrastructure project management with innovative digital solutions for efficient, transparent, and sustainable development.
                            </p>
                            <div class="flex space-x-4">
                                <div class="w-10 h-10 bg-surface-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300 cursor-pointer">
                                    <i class="pi pi-shield text-surface-300"></i>
                                </div>
                                <div class="w-10 h-10 bg-surface-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300 cursor-pointer">
                                    <i class="pi pi-lock text-surface-300"></i>
                                </div>
                                <div class="w-10 h-10 bg-surface-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300 cursor-pointer">
                                    <i class="pi pi-mobile text-surface-300"></i>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 class="text-lg font-semibold text-white mb-4">Quick Links</h4>
                            <ul class="space-y-2">
                                <li><a href="#modules" class="text-surface-300 hover:text-primary transition-colors duration-300">System Modules</a></li>
                                <li><a routerLink="/auth/login" class="text-surface-300 hover:text-primary transition-colors duration-300">Login Portal</a></li>
                                <li><a href="#modules" class="text-surface-300 hover:text-primary transition-colors duration-300">Documentation</a></li>
                                <li><a href="#modules" class="text-surface-300 hover:text-primary transition-colors duration-300">Support</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 class="text-lg font-semibold text-white mb-4">Contact</h4>
                            <ul class="space-y-2 text-surface-300">
                                <li class="flex items-center">
                                    <i class="pi pi-envelope mr-2 text-primary"></i>
                                    <span>support@wms.gov.in</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="pi pi-phone mr-2 text-primary"></i>
                                    <span>1800-XXX-XXXX</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="pi pi-clock mr-2 text-primary"></i>
                                    <span>24/7 Support</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="border-t border-surface-700/50 pt-8 text-center">
                        <p class="text-surface-400">&copy; 2026 Work Management System. All rights reserved.</p>
                        <div class="flex justify-center items-center mt-4 space-x-6 text-sm text-surface-500">
                            <span>SSL Secured</span>
                            <span>•</span>
                            <span>Government Portal</span>
                            <span>•</span>
                            <span>ISO Certified</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Module Details Dialog -->
            <p-dialog
                [(visible)]="displayDialog"
                [header]="selectedModule?.title"
                [modal]="true"
                [style]="{width: '95vw', maxWidth: '1000px'}"
                [closable]="true"
                [draggable]="false"
                [blockScroll]="true"
                styleClass="module-dialog"
            >
                <div *ngIf="selectedModule" class="module-details">
                    <!-- Header Section -->
                    <div class="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl mb-6 border border-primary/20">
                        <div class="flex items-center mb-4">
                            <div class="w-16 h-16 bg-gradient-to-r from-primary to-primary-600 rounded-xl flex items-center justify-center mr-4">
                                <i [class]="selectedModule.icon" class="text-3xl text-white"></i>
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-0 mb-1">
                                    {{ selectedModule.title.split(':')[1] || selectedModule.title }}
                                </h3>
                                <p class="text-primary font-medium">{{ selectedModule.shortDescription }}</p>
                            </div>
                        </div>
                        <p class="text-surface-700 dark:text-surface-300 leading-relaxed text-lg">
                            {{ selectedModule.description }}
                        </p>
                    </div>

                    <!-- Functional Requirements -->
                    <div class="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-6">
                        <h4 class="font-bold text-xl mb-6 text-surface-900 dark:text-surface-0 flex items-center">
                            <i class="pi pi-check-circle text-primary mr-3"></i>
                            Functional Requirements
                        </h4>
                        <div class="grid gap-3">
                            <div *ngFor="let detail of selectedModule.details; let i = index"
                                 class="flex items-start p-4 bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 hover:border-primary/50 transition-colors duration-300">
                                <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                                    <span class="text-sm font-bold text-primary">{{ i + 1 }}</span>
                                </div>
                                <span class="text-surface-700 dark:text-surface-300 leading-relaxed flex-1">{{ detail }}</span>
                            </div>
                        </div>
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

    scrollToModules(): void {
        const element = document.getElementById('modules');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}
