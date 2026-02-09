import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {
  private http = inject(HttpClient);
  
  // Aapka Base URL (Isse apne according change kar lena)
  private baseUrl = 'http://203.100.79.155'; 

  
  private parseStringResponse(res: any) {
    return typeof res === 'string' ? JSON.parse(res) : res;
  }

  // 1. Legal Status Dropdown (POST)
  getLegalStatus(): Observable<any[]> {
    return this.http.post(`${this.baseUrl}/api/Vendor/GetLegalStatusMaster`, {}).pipe(
      map(res => this.parseStringResponse(res))
    );
  }

  // 2. Company Category Dropdown (POST)
  getCompanyCategory(): Observable<any[]> {
    return this.http.post(`${this.baseUrl}/api/Vendor/GetCompanyCategoryMaster`, {}).pipe(
      map(res => this.parseStringResponse(res))
    );
  }

  // 3. Company Status Master Dropdown (POST)
  getCompanyStatusMaster(): Observable<any[]> {
    return this.http.post(`${this.baseUrl}/api/Vendor/GetCompanyStatusMaster`, {}).pipe(
      map(res => this.parseStringResponse(res))
    );
  }
  // 4. Company Registration Class Master Dropdown (POST)
  getCompanyRegClassMaster(): Observable<any[]> {
    return this.http.post(`${this.baseUrl}/api/Vendor/GetCompanyRegClassMaster`, {}).pipe(
      map(res => this.parseStringResponse(res))
    );
  }

  // // 5. Final Profile Submission (POST)
  // updateProfile(payload: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/api/Contractor/UpdateContractorProfile`, payload);
  // }

  // 6. Documents Upload 
  get UploadDocTypeMaster(): Observable<any[]> {
    return this.http.post(`${this.baseUrl}/api/Vendor/GetUploadDocTypeMaster`, {}).pipe(
      map(res => this.parseStringResponse(res))
    );
  }
}