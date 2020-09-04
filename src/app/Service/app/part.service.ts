import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class PartService {

  constructor(private token:TokenService,private http:HttpClient) { }


  tenantId = this.token.getTenantID();

  tenant_id(tenantId):Observable<any> {
    return this.http.get('machines?tenant_id='+tenantId)
  }
  display_reason(id):Observable<any>{
    return this.http.get('part_doc_index?id='+id)
  }
  file_upload(val):Observable<any>{
    return this.http.post('part_doc_upload',val)
  }
}