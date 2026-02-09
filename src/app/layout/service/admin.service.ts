import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  updateManpower(payload: { id: number | null; role: string; grade: string; network_ID: string; terminal_ID: string; }) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'http://203.100.79.155';

  constructor(private http: HttpClient) {}

 //POST APIs for adding data to database

  addNewUser(data: any) {
    return this.http.post(`
      ${this.baseUrl}/api/Admin/AddNewUser`,
      data
    );
 }

  addMachinery(data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/Admin/InsertMachinaryMasterData`,
      data
    );
  }

  addManpower(data: any) {
    return this.http.post(
      `${this.baseUrl}/api/Admin/InsertManPowerMasterData`,
      data
    );
  }
  
  addEquipment(data: any) {
    return this.http.post(
      `${this.baseUrl}/api/Admin/InsertEquipmentsMasterData`,
      data
    );
  }
  
  addWorkType(body: any) {
    return this.http.post(`${this.baseUrl}/api/Admin/InsertWorkTypeMasterData`, body);
  }

  addSubWorkType(body: any) {
    return this.http.post(`${this.baseUrl}/api/Admin/InsertSubWorkTypeMasterData`, body);
  }

 //GET APIs for fetching data from database
  getMachinery(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Admin/GetMachinaryMaster`); 
  }

  getEquipments(): Observable<any> {
      return this.http.get(`${this.baseUrl}/api/Admin/GetEquipmentsMaster`);
    }

  getManpower(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Admin/GetManPowerMaster`);  
  }
  getRoles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Admin/GetRoles`);  
  }

}
