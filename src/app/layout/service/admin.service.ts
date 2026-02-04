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
    return this.http.post('/api/Admin/InsertWorkTypeMasterData', body);
  }

  addSubWorkType(body:any){
    return this.http.post('/api/Admin/InsertSubWorkTypeMasterData', body);
  }


}
