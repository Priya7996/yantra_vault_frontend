import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  

  private token: string | null = null;
  private tenant_id: string | null = null;

  constructor() { 
    // alert("start")
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      this.token = savedToken;
    }

    const tenant = localStorage.getItem('tenant_id');
    if (tenant) {
      this.tenant_id = tenant;
    }
  }
  ngOnInit() {
  }

  getEncodedToken(): string | null {
    return this.token;
  }
  getTenantID(): string | null {
    return this.tenant_id;
  }
  setToken(token?: string | null) {
    this.token = token || null;

    if (token) {
      localStorage.setItem(token, token);
    } else {
      localStorage.removeItem(token);
    }  }


}

