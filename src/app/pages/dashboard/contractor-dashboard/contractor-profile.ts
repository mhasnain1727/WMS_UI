import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Toast } from "primeng/toast";
import { MessageService } from 'primeng/api';
import { ContractorService } from '@/layout/service/contractor.service';

@Component({
  selector: 'app-contractor-profile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DatePickerModule,
    DividerModule,
    SelectModule,
    ButtonModule,
    Toast
  ],
  template: `
  <div class="min-h-screen bg-[var(--surface-ground)] p-6 md:p-10 transition-colors duration-300">
    <p-toast position="top-right"></p-toast>
    
    <div class="flex flex-col md:flex-row gap-8 mb-10 items-stretch">
      <div class="w-full md:w-[28%] bg-[var(--surface-card)] rounded-[40px] p-10 flex flex-col items-center justify-center shadow-sm border border-[var(--surface-border)]">
        <div class="relative w-44 h-44 flex items-center justify-center">
          <svg class="progress-ring -rotate-90 absolute" width="176" height="176">
            <circle class="stroke-[var(--surface-200)] fill-none stroke-[10]" cx="88" cy="88" r="78"></circle>
            <circle class="stroke-[var(--primary-color)] fill-none stroke-[10] transition-all duration-1000"
              cx="88" cy="88" r="78" [attr.stroke-dasharray]="490" [attr.stroke-dashoffset]="171"></circle>
          </svg>
          <div class="flex flex-col items-center justify-center z-10">
            <i class="pi text-xl text-[var(--text-color-secondary)] mb-1" [ngClass]="role === 'COMPANY' ? 'pi-building' : 'pi-user'"></i>
            <span class="text-3xl font-black text-[var(--text-color)] leading-none">65%</span>
          </div>
        </div>
        
        <div class="mt-6 text-center">
          <h3 class="text-2xl font-black text-[var(--text-color)] tracking-tight leading-none">{{ username }}</h3>
          <span class="text-[10px] font-bold text-[var(--text-color-secondary)] uppercase tracking-widest mt-2 block">username</span>
        </div>
      </div>

      <div class="flex-1 bg-[var(--surface-card)] rounded-[40px] p-12 shadow-sm border border-[var(--surface-border)] flex items-center">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-12 w-full text-sm font-medium">
          <div class="flex flex-col gap-1.5">
            <span class="text-[11px] font-bold text-[var(--text-color-secondary)] uppercase tracking-[0.2em]">Full Name</span>
            <span class="text-lg font-bold text-[var(--text-color)]">{{ headerFullName || '—' }}</span>
          </div>
          <div class="flex flex-col gap-1.5"><span class="text-[11px] font-bold text-[var(--text-color-secondary)] uppercase tracking-[0.2em]">Email ID</span><span class="text-lg font-bold text-[var(--text-color)]">{{ email }}</span></div>
          <div class="flex flex-col gap-1.5"><span class="text-[11px] font-bold text-[var(--text-color-secondary)] uppercase tracking-[0.2em]">Mobile</span><span class="text-lg font-bold text-[var(--text-color)]">{{ mobile }}</span></div>
          <div class="flex flex-col gap-1.5"><span class="text-[11px] font-bold text-[var(--text-color-secondary)] uppercase tracking-[0.2em]">Account Role</span><span class="text-[var(--primary-color)] font-black text-sm uppercase tracking-wider">{{role}}</span></div>
          <div class="flex flex-col gap-1.5"><span class="text-[11px] font-bold text-[var(--text-color-secondary)] uppercase tracking-[0.2em]">Status</span><span class="text-[var(--primary-color)] font-black text-sm flex items-center gap-2"><i class="pi pi-verified"></i> ACTIVE</span></div>
        </div>
      </div>
    </div>

    <div class="bg-[var(--surface-card)] rounded-[48px] p-12 md:p-20 shadow-sm border border-[var(--surface-border)]">
      <form [formGroup]="profileForm">

        <div class="text-center mb-16">
          <div class="w-10 h-1 bg-[var(--primary-color)] mx-auto rounded-full mb-4"></div>
          <h2 class="text-2xl font-black text-[var(--text-color)] tracking-tight">Personal & Address Details</h2>
        </div>

        <div class="grid grid-cols-12 gap-x-8 gap-y-10">
          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">First Name</label>
            <input pInputText formControlName="firstName" class="premium-input" placeholder="Enter First Name" />
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Surname</label>
            <input pInputText formControlName="surname" class="premium-input" placeholder="Enter Surname" />
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">DOB (As per Aadhar Card)</label>
            <p-datepicker formControlName="dob" dateFormat="dd/mm/yy" [showIcon]="true" styleClass="premium-datepicker" placeholder="DD/MM/YYYY"></p-datepicker>
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Country</label>
            <input pInputText formControlName="country" class="premium-input" placeholder="e.g. India" />
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">State</label>
            <input pInputText formControlName="state" class="premium-input" placeholder="e.g. Punjab" />
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">City</label>
            <input pInputText formControlName="city" class="premium-input" placeholder="e.g. Chandigarh" />
          </div>

          <div class="col-span-12 md:col-span-8 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Detailed Address</label>
            <input pInputText formControlName="address" class="premium-input" placeholder="House No., Street, Locality" />
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Postal Code (PIN Code)</label>
            <input pInputText formControlName="postalCode" class="premium-input" placeholder="160001" />
          </div>
        </div>

        <div class="flex justify-center mt-12">
          <button type="button" pButton (click)="savePersonal()" 
                  label="Save Personal & Address Details" 
                  class="p-button-rounded p-button-outlined border-[var(--primary-color)] text-[var(--primary-color)] font-bold px-10 hover:bg-[var(--primary-50)] transition-all">
          </button>
        </div>
        
        <p-divider class="my-20"></p-divider>
        
        <div class="text-center mb-16">
          <div class="w-10 h-1 bg-[var(--primary-color)] mx-auto rounded-full mb-4"></div>
          <h2 class="text-2xl font-black text-[var(--text-color)] tracking-tight">Bank & Financial Details</h2>
        </div>

        <div class="grid grid-cols-12 gap-x-8 gap-y-10">
          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">PAN Number</label>
            <input pInputText formControlName="panNumber" class="premium-input" placeholder="ABCDE1234F" />
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">TAN Number</label>
            <input pInputText formControlName="tanNumber" class="premium-input" placeholder="RTK000123G" />
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">GST Number</label>
            <input pInputText formControlName="gstNumber" class="premium-input" placeholder="22AAAAA0000A1Z5" />
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Account Number</label>
            <input pInputText formControlName="accountNo" class="premium-input" placeholder="Enter Account No." />
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Account Holder Name</label>
            <input pInputText formControlName="accHolderName" class="premium-input" placeholder="As per Bank Records" />
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Bank Name</label>
            <input pInputText formControlName="bankId" class="premium-input" placeholder="Enter Bank Name" />
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">IFSC Code</label>
            <input pInputText formControlName="ifscCode" class="premium-input" placeholder="SBIN0001234" />
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Quoted Amount (₹)</label>
            <input pInputText formControlName="quotedAmount" class="premium-input" placeholder="0.00" />
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2 group">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Passbook Copy Upload</label>
            <div class="flex items-center gap-4 p-3 rounded-[14px] border border-[var(--surface-border)] bg-[var(--surface-50)] hover:bg-[var(--surface-card)] transition-all cursor-pointer" (click)="passbookInput.click()">
              <i class="pi pi-file-pdf text-slate-400 text-xl group-hover:text-[var(--primary-color)] transition-colors"></i>
              <div class="flex flex-col">
                <span class="text-[11px] font-black text-[var(--text-color)] uppercase">Upload Passbook</span>
                <span class="text-[9px] text-slate-400 font-bold">Max 2MB (PDF/JPEG)</span>
              </div>
              <i class="pi pi-upload ml-auto text-slate-300 text-xs"></i>
            </div>
            <input type="file" #passbookInput class="hidden" (change)="onPassbookSelect($event)">
          </div>
        </div>

        <div class="flex justify-center mt-12">
          <button type="button" pButton (click)="saveBankDetails()" 
                  label="Save Bank Details" 
                  class="p-button-rounded p-button-outlined border-[var(--primary-color)] text-[var(--primary-color)] font-bold px-10 hover:bg-[var(--primary-50)] transition-all">
          </button>
        </div>
        
        <p-divider class="my-20"></p-divider>

        <!-- Company & Legal Information section only for COMPANY role -->
        <div *ngIf="role === 'COMPANY'">
  <div class="text-center mb-16">
    <div class="w-10 h-1 bg-[var(--primary-color)] mx-auto rounded-full mb-4"></div>
    <h2 class="text-2xl font-black text-[var(--text-color)] tracking-tight">Company & Legal Information</h2>
  </div>

  <div class="grid grid-cols-12 gap-x-8 gap-y-10">
    <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
      <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Legal Status</label>
      <p-select [options]="legalStatusOptions" 
                formControlName="legalStatus" 
                optionLabel="StatusName" 
                optionValue="ID"
                placeholder="Select Status" 
                styleClass="premium-dropdown" 
                class="w-full">
      </p-select>
    </div>

    <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
      <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Company Category</label>
      <p-select [options]="categoryOptions" 
                formControlName="companyCategory" 
                optionLabel="CategoryName" 
                optionValue="CategoryID"
                placeholder="Select Category" 
                styleClass="premium-dropdown" 
                class="w-full">
      </p-select>
    </div>

    <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
      <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Status of Company</label>
      <p-select [options]="companyStatusOptions" 
                formControlName="statusOfCompany" 
                optionLabel="StatusName" 
                optionValue="StatusID"
                placeholder="Select Status" 
                styleClass="premium-dropdown" 
                class="w-full">
      </p-select>
    </div>

    <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
      <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Registration Number</label>
      <input pInputText formControlName="registrationNo" class="premium-input" placeholder="e.g. REG123456" />
    </div>

    <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
      <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Registration Class</label>
      <p-select [options]="regClassOptions" 
                formControlName="regClass" 
                optionLabel="Class" 
                optionValue="ClassID"
                placeholder="Select Class" 
                styleClass="premium-dropdown" 
                class="w-full">
      </p-select>
    </div>

    <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
      <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Establishment Year</label>
      <p-datepicker formControlName="establishmentYear" view="year" dateFormat="yy" [showIcon]="true" placeholder="YYYY" styleClass="premium-datepicker"></p-datepicker>
    </div>

    <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
      <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Commencement Year</label>
      <p-datepicker formControlName="commencementYear" view="year" dateFormat="yy" [showIcon]="true" placeholder="YYYY" styleClass="premium-datepicker"></p-datepicker>
    </div>

    <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
      <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Is ISO Certified?</label>
      <p-select [options]="['Yes', 'No']" formControlName="isISOCertified" placeholder="Select" styleClass="premium-dropdown" class="w-full"></p-select>
    </div>
  </div>

  <div class="flex justify-center mt-12">
    <button type="button" pButton (click)="saveCompanyDetails()" 
            label="Save Company Details" 
            class="p-button-rounded p-button-outlined border-[var(--primary-color)] text-[var(--primary-color)] font-bold px-10 hover:bg-[var(--primary-50)] transition-all">
    </button>
  </div>
  <p-divider class="my-20"></p-divider>
</div>
        <!--company & legal details end-->

        <!-- Work & Tender Details section for both roles -->
        <div class="text-center mb-16">
          <div class="w-10 h-1 bg-[var(--primary-color)] mx-auto rounded-full mb-4"></div>
          <h2 class="text-2xl font-black text-[var(--text-color)] tracking-tight">Work & Tender Details</h2>
        </div>

        <div class="grid grid-cols-12 gap-x-8 gap-y-10">
          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Tender Type</label>
            <p-select [options]="tenderTypes" formControlName="tenderType" optionLabel="name" optionValue="id" 
                      placeholder="Select Tender" styleClass="premium-dropdown" class="w-full"
                      (onChange)="onTenderChange($event)"></p-select>
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Work Type</label>
            <p-select [options]="workTypes" formControlName="workType" optionLabel="name" optionValue="id" 
                      placeholder="Select Work Type" styleClass="premium-dropdown" class="w-full"
                      [disabled]="!workTypes.length" (onChange)="onWorkTypeChange($event)"></p-select>
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Sub Work Type</label>
            <p-select [options]="subWorkTypes" formControlName="subWorkType" optionLabel="name" optionValue="id" 
                      placeholder="Select Sub Work" styleClass="premium-dropdown" class="w-full"
                      [disabled]="!subWorkTypes.length"></p-select>
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Years of Experience</label>
            <input pInputText type="number" formControlName="yearsOfExperience" class="premium-input" placeholder="e.g. 10" />
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Manpower Strength</label>
            <input pInputText type="number" formControlName="manpowerStrength" class="premium-input" placeholder="Total Staff" />
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Projects Completed</label>
            <input pInputText type="number" formControlName="projectsCompleted" class="premium-input" placeholder="e.g. 25" />
          </div>

          <div class="col-span-12 flex flex-col gap-2">
            <label class="text-[10px] font-black text-[var(--text-color-secondary)] uppercase tracking-[0.15em] ml-0.5">Available Equipment & Machinery</label>
            <textarea pInputTextarea formControlName="availableEquipment" rows="3" class="premium-input !h-auto" placeholder="List your machinery..."></textarea>
          </div>
        </div>

        <div class="flex justify-center mt-12">
          <button type="button" pButton (click)="saveWorkDetails()" 
                  label="Save Work Details" 
                  class="p-button-rounded p-button-outlined border-[var(--primary-color)] text-[var(--primary-color)] font-bold px-10 hover:bg-[var(--primary-50)] transition-all">
          </button>
        </div>
        
        <p-divider class="my-20"></p-divider>

        <div class="text-center mb-16">
          <div class="w-10 h-1 bg-[var(--primary-color)] mx-auto rounded-full mb-4"></div>
          <h2 class="text-2xl font-black text-[var(--text-color)] tracking-tight">Document Repository</h2>
          <p class="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-2">Supported formats: PDF, JPG, PNG</p>
        </div>

        <div class="grid grid-cols-12 gap-x-8 gap-y-10">
          
          <div *ngIf="($any(role)) === 'CONTRACTOR'" class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="doc-label">Registration Certificate <span class="size-hint">(Max 2MB)</span></label>
            <div class="upload-box" [class.upload-active]="uploadedDocs['regCert']" (click)="!uploadedDocs['regCert'] && file1.click()">
              <ng-container *ngTemplateOutlet="uploadContent; context: { id: 'regCert', label: 'Upload Certificate' }"></ng-container>
            </div>
            <input type="file" #file1 class="hidden" (change)="onUpload($event, 'regCert')" accept=".pdf,image/*">
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="doc-label">GST Certificate <span class="size-hint">(Max 2MB)</span></label>
            <div class="upload-box" [class.upload-active]="uploadedDocs['gstCert']" (click)="!uploadedDocs['gstCert'] && file2.click()">
              <ng-container *ngTemplateOutlet="uploadContent; context: { id: 'gstCert', label: 'Upload GST Proof' }"></ng-container>
            </div>
            <input type="file" #file2 class="hidden" (change)="onUpload($event, 'gstCert')" accept=".pdf,image/*">
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="doc-label">PAN Card <span class="size-hint">(Max 1MB)</span></label>
            <div class="upload-box" [class.upload-active]="uploadedDocs['panCard']" (click)="!uploadedDocs['panCard'] && file3.click()">
              <ng-container *ngTemplateOutlet="uploadContent; context: { id: 'panCard', label: 'Upload PAN Card' }"></ng-container>
            </div>
            <input type="file" #file3 class="hidden" (change)="onUpload($event, 'panCard')" accept=".pdf,image/*">
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="doc-label">Bank Details Proof <span class="size-hint">(Max 2MB)</span></label>
            <div class="upload-box" [class.upload-active]="uploadedDocs['bankProof']" (click)="!uploadedDocs['bankProof'] && file4.click()">
              <ng-container *ngTemplateOutlet="uploadContent; context: { id: 'bankProof', label: 'Upload Passbook' }"></ng-container>
            </div>
            <input type="file" #file4 class="hidden" (change)="onUpload($event, 'bankProof')" accept=".pdf,image/*">
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="doc-label">EMD Receipt <span class="size-hint">(Max 2MB)</span></label>
            <div class="upload-box" [class.upload-active]="uploadedDocs['emdReceipt']" (click)="!uploadedDocs['emdReceipt'] && file5.click()">
              <ng-container *ngTemplateOutlet="uploadContent; context: { id: 'emdReceipt', label: 'Upload Receipt' }"></ng-container>
            </div>
            <input type="file" #file5 class="hidden" (change)="onUpload($event, 'emdReceipt')" accept=".pdf,image/*">
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="doc-label">Tender Fee Receipt <span class="size-hint">(Max 2MB)</span></label>
            <div class="upload-box" [class.upload-active]="uploadedDocs['tenderFee']" (click)="!uploadedDocs['tenderFee'] && file6.click()">
              <ng-container *ngTemplateOutlet="uploadContent; context: { id: 'tenderFee', label: 'Upload Fee Receipt' }"></ng-container>
            </div>
            <input type="file" #file6 class="hidden" (change)="onUpload($event, 'tenderFee')" accept=".pdf,image/*">
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="doc-label">Experience Certificates <span class="size-hint">(Max 5MB)</span></label>
            <div class="upload-box" [class.upload-active]="uploadedDocs['workExp']" (click)="!uploadedDocs['workExp'] && file7.click()">
              <ng-container *ngTemplateOutlet="uploadContent; context: { id: 'workExp', label: 'Upload Experience' }"></ng-container>
            </div>
            <input type="file" #file7 class="hidden" (change)="onUpload($event, 'workExp')" accept=".pdf,image/*">
          </div>

          <div *ngIf="role === 'COMPANY'" class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="doc-label">Turnover / CA Certificate <span class="size-hint">(Max 5MB)</span></label>
            <div class="upload-box" [class.upload-active]="uploadedDocs['turnoverCert']" (click)="!uploadedDocs['turnoverCert'] && file8.click()">
              <ng-container *ngTemplateOutlet="uploadContent; context: { id: 'turnoverCert', label: 'Upload CA Cert' }"></ng-container>
            </div>
            <input type="file" #file8 class="hidden" (change)="onUpload($event, 'turnoverCert')" accept=".pdf,image/*">
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="doc-label">Affidavit <span class="size-hint">(Max 1MB)</span></label>
            <div class="upload-box" [class.upload-active]="uploadedDocs['affidavit']" (click)="!uploadedDocs['affidavit'] && file9.click()">
              <ng-container *ngTemplateOutlet="uploadContent; context: { id: 'affidavit', label: 'Upload Affidavit' }"></ng-container>
            </div>
            <input type="file" #file9 class="hidden" (change)="onUpload($event, 'affidavit')" accept=".pdf,image/*">
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="doc-label">Technical Bid (PDF) <span class="size-hint">(Max 10MB)</span></label>
            <div class="upload-box" [class.upload-active]="uploadedDocs['techBid']" (click)="!uploadedDocs['techBid'] && file10.click()">
              <ng-container *ngTemplateOutlet="uploadContent; context: { id: 'techBid', label: 'Upload Technical' }"></ng-container>
            </div>
            <input type="file" #file10 class="hidden" (change)="onUpload($event, 'techBid')" accept=".pdf,image/*">
          </div>

          <div class="col-span-12 md:col-span-4 flex flex-col gap-2">
            <label class="doc-label">Financial Bid Sheet <span class="size-hint">(Max 5MB)</span></label>
            <div class="upload-box" [class.upload-active]="uploadedDocs['finBid']" (click)="!uploadedDocs['finBid'] && file11.click()">
              <ng-container *ngTemplateOutlet="uploadContent; context: { id: 'finBid', label: 'Upload Financial' }"></ng-container>
            </div>
            <input type="file" #file11 class="hidden" (change)="onUpload($event, 'finBid')" accept=".pdf,image/*">
          </div>
        </div>

        <ng-template #uploadContent let-id="id" let-label="label">
          <div *ngIf="uploadedDocs[id]" class="flex items-center gap-4 w-full">
            <div class="relative flex items-center justify-center min-w-[40px] h-[40px] rounded-lg"
                [ngClass]="uploadedDocs[id].toLowerCase().endsWith('.pdf') ? 'bg-red-50' : 'bg-blue-50'">
              <i class="pi" 
                [ngClass]="uploadedDocs[id].toLowerCase().endsWith('.pdf') ? 'pi-file-pdf text-red-600' : 'pi-image text-blue-600'" 
                style="font-size: 1.5rem;"></i>
              <span class="absolute -bottom-1 text-[8px] font-black text-white px-1 rounded"
                    [ngClass]="uploadedDocs[id].toLowerCase().endsWith('.pdf') ? 'bg-red-600' : 'bg-blue-600'">
                {{ uploadedDocs[id].toLowerCase().endsWith('.pdf') ? 'PDF' : 'IMG' }}
              </span>
            </div>
            <div class="flex flex-col overflow-hidden flex-1">
              <span class="text-[12px] font-bold text-slate-700 truncate">{{ uploadedDocs[id] }}</span>
              <span class="text-[9px] text-emerald-500 font-black uppercase tracking-wider">File Selected</span>
            </div>
            <i class="pi pi-times-circle text-red-400 hover:text-red-600 text-lg transition-colors cursor-pointer" (click)="removeDoc(id, $event)"></i>
          </div>
          <div *ngIf="!uploadedDocs[id]" class="flex items-center gap-3 w-full">
            <i class="pi pi-cloud-upload text-xl text-slate-300"></i>
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{{label}}</span>
            <i class="pi pi-plus ml-auto text-[10px] text-slate-300"></i>
          </div>
        </ng-template>

        <div class="flex justify-center mt-12">
          <button type="button" pButton (click)="saveDocumentSection()" 
                  label="Save Document Progress" 
                  icon="pi pi-save"
                  class="p-button-rounded p-button-outlined border-[var(--primary-color)] text-[var(--primary-color)] font-bold px-10 hover:bg-[var(--primary-50)] transition-all">
          </button>
        </div>

        <p-divider class="my-20"></p-divider>

        <div class="flex justify-center mb-10">
          <button pButton pRipple (click)="submitFinalProfile()" 
                  class="p-button-lg px-16 py-5 rounded-[24px] bg-[var(--primary-color)] border-none shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-white font-black uppercase tracking-tighter">
            Submit Final Profile
          </button>
        </div>
      </form>
    </div>
  </div>
  `,
  styles: [`
    .premium-input {
      border-radius: 14px !important;
      border: 1.5px solid var(--surface-border) !important;
      padding: 0.9rem 1.2rem !important;
      font-size: 14px !important;
      font-weight: 700 !important;
      background: var(--surface-50) !important;
      color: var(--text-color) !important;
      width: 100% !important;
      transition: all 0.2s ease;
    }
    .premium-input:focus {
      border-color: var(--primary-color) !important;
      background: var(--surface-card) !important;
      box-shadow: 0 0 0 1px var(--primary-color) !important;
    }
    :host ::ng-deep .premium-datepicker .p-inputtext {
      border-radius: 14px 0 0 14px !important;
      border: 1.5px solid var(--surface-border) !important;
      border-right: none !important;
      padding: 0.9rem 1.2rem !important;
      font-weight: 700 !important;
      background: var(--surface-50) !important;
      color: var(--text-color) !important;
    }
    :host ::ng-deep .premium-datepicker .p-datepicker-trigger {
      border-radius: 0 14px 14px 0 !important;
      border: 1.5px solid var(--surface-border) !important;
      background: var(--surface-100) !important;
      color: var(--text-color-secondary) !important;
    }
    :host ::ng-deep .premium-dropdown {
      border-radius: 14px !important;
      border: 1.5px solid var(--surface-border) !important;
      background: var(--surface-50) !important;
      width: 100% !important;
      display: flex !important;
    }
    :host ::ng-deep .p-select-label {
      padding: 0.9rem 1.2rem !important;
      font-weight: 700 !important;
      font-size: 14px !important;
      color: var(--text-color) !important;
    }
    .upload-box {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.9rem 1.2rem;
      background: var(--surface-50);
      border: 1.5px dashed var(--surface-border);
      border-radius: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      height: 65px;
    }
    .upload-active {
      border: 1.5px solid #10b981 !important;
      background: #f0fdf4 !important;
    }
    .upload-box:hover:not(.upload-active) {
      border-color: var(--primary-color);
      background: var(--surface-card);
    }
    .doc-label {
      font-size: 10px;
      font-weight: 900;
      color: var(--text-color-secondary);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .size-hint {
      color: #94a3b8;
      font-weight: 500;
      text-transform: none;
      letter-spacing: 0;
    }
    .bg-red-50 { background-color: #fef2f2; }
    .bg-blue-50 { background-color: #eff6ff; }
    .bg-red-600 { background-color: #dc2626 !important; }
    .bg-blue-600 { background-color: #2563eb !important; }
  `]
})
export class ContractorProfile implements OnInit {
  // Services Inject ki
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private contractorService = inject(ContractorService);

  username = 'rahul_123';
  headerFullName = ''; 
  email = 'rahul@gmail.com';
  mobile = '9876543210';
  profileForm!: FormGroup;
  role: 'COMPANY' | 'CONTRACTOR' | string = 'COMPANY';

  // In arrays ko ab hum API se bharenge
  legalStatusOptions: any[] = [];
  categoryOptions: any[] = [];
  companyStatusOptions: any[] = [];
  regClassOptions: any[] = []; // Naya dropdown array

  tenderTypes: any[] = [{id: 1, name: 'Civil Tender'}, {id: 2, name: 'Electrical Tender'}];
  workTypes: any[] = [];
  subWorkTypes: any[] = [];
  uploadedDocs: { [key: string]: string } = {};

  ngOnInit() {
    this.initForm();
    
    // Agar Role Company hai toh dropdowns load karo
    if (this.role === 'COMPANY') {
      this.loadCompanyMasters();
    }
  }

  private initForm() {
    this.profileForm = this.fb.group({
      firstName: [''], surname: [''], dob: [null],
      country: ['India'], state: [''], city: [''], address: [''], postalCode: [''],
      panNumber: [''], tanNumber: [''], gstNumber: [''],
      accountNo: [''], accHolderName: [''], bankId: [''], ifscCode: [''],
      quotedAmount: [''],
      tenderType: [''], workType: [''], subWorkType: [''],
      yearsOfExperience: [''], manpowerStrength: [''],
      projectsCompleted: [''], availableEquipment: ['']
    });

    if (this.role === 'COMPANY') {
      this.addCompanyFields();
    }
  }

  private addCompanyFields() {
    const companyControls = {
      legalStatus: [''], companyCategory: [''], statusOfCompany: [''],
      registrationNo: [''], regClass: [''], establishmentYear: [null],
      commencementYear: [null], isISOCertified: ['No']
    };
    Object.keys(companyControls).forEach(key => {
      this.profileForm.addControl(key, this.fb.control((companyControls as any)[key][0]));
    });
  }

  // API se data load karne ka function
  loadCompanyMasters() {
    // 1. Legal Status Load
    this.contractorService.getLegalStatus().subscribe({
      next: (data) => this.legalStatusOptions = data,
      error: (err) => console.error('Legal Status Error:', err)
    });

    // 2. Category Load
    this.contractorService.getCompanyCategory().subscribe({
      next: (data) => this.categoryOptions = data,
      error: (err) => console.error('Category Error:', err)
    });

    // 3. Company Status Load
    this.contractorService.getCompanyStatusMaster().subscribe({
      next: (data) => this.companyStatusOptions = data,
      error: (err) => console.error('Company Status Error:', err)
    });

    // 4. Registration Class Load
    this.contractorService.getCompanyRegClassMaster().subscribe({
      next: (data) => this.regClassOptions = data,
      error: (err) => console.error('Reg Class Error:', err)
    });
  }

  onTenderChange(event: any) {
    const tenderId = event.value;
    this.workTypes = []; 
    this.subWorkTypes = [];
    this.profileForm.patchValue({ workType: '', subWorkType: '' });
    if(tenderId === 1) {
      this.workTypes = [{id: 101, name: 'Road Construction'}, {id: 102, name: 'Bridge Work'}];
    } else if(tenderId === 2) {
      this.workTypes = [{id: 201, name: 'Internal Wiring'}, {id: 202, name: 'Substation Work'}];
    }
  }

  onWorkTypeChange(event: any) {
    const workTypeId = event.value;
    this.subWorkTypes = [];
    this.profileForm.patchValue({ subWorkType: '' });
    if(workTypeId === 101) {
      this.subWorkTypes = [{id: 501, name: 'Bitumen Road'}, {id: 502, name: 'Concrete Road'}];
    }
  }

  savePersonal() {
    const fName = this.profileForm.get('firstName')?.value || '';
    const sName = this.profileForm.get('surname')?.value || '';
    this.headerFullName = `${fName} ${sName}`.trim();
    this.messageService.add({severity:'success', summary:'Saved', detail:'Personal details updated'});
  }

  saveBankDetails() { this.messageService.add({severity:'success', summary:'Saved', detail:'Bank details updated'}); }
  saveCompanyDetails() { this.messageService.add({severity:'success', summary:'Saved', detail:'Company details updated'}); }
  saveWorkDetails() { this.messageService.add({severity:'success', summary:'Saved', detail:'Work details updated'}); }

  onPassbookSelect(event: any) {
    const file = event.target.files[0];
    if (file) this.messageService.add({severity:'info', summary:'File Selected', detail: file.name});
  }

  onUpload(event: any, docType: string) {
    const file = event.target.files[0];
    if (!file) return;
    const limits: { [key: string]: number } = {
      'regCert': 2, 'gstCert': 2, 'panCard': 1, 'bankProof': 2,
      'emdReceipt': 2, 'tenderFee': 2, 'workExp': 5, 'turnoverCert': 5,
      'affidavit': 1, 'techBid': 10, 'finBid': 5
    };
    const maxSizeMB = limits[docType] || 2;
    if (file.size > maxSizeMB * 1024 * 1024) {
      this.messageService.add({ severity: 'error', summary: 'Too Large', detail: `Max ${maxSizeMB}MB allowed` });
      return;
    }
    this.uploadedDocs[docType] = file.name;
    this.messageService.add({ severity: 'success', summary: 'Uploaded', detail: file.name });
  }

  saveDocumentSection() {
    this.messageService.add({ severity: 'info', summary: 'Saved', detail: 'Document progress saved' });
  }

  removeDoc(docType: string, event: Event) {
    event.stopPropagation();
    delete this.uploadedDocs[docType];
  }

  submitFinalProfile() {
    if (this.profileForm.valid) {
      // Ab aap submit ke liye form value aur documents backend par bhej sakte hain
      const finalPayload = {
        ...this.profileForm.value,
        uploadedDocuments: this.uploadedDocs
      };
      this.messageService.add({ severity: 'success', summary: 'Profile Submitted', detail: 'Sent for verification' });
      console.log("Final Data for API:", finalPayload);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Invalid Form', detail: 'Please fill all required fields' });
    }
  }
}