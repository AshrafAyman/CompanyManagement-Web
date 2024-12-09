import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginCredentials } from "../models/login.model";
import { RegisterCredentials } from "../models/register.model";
import { isPlatformBrowser } from "@angular/common";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private tokenExpirationTime: number = 60;
  private apiUrl = 'https://localhost:7293/api/account';
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(credentials: RegisterCredentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }


  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
    }
  }

  getToken(): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem('authToken')
      : null;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      return !!token;
    }
    return false;
  }

  isTokenExpired(): boolean {
    var token = this.getToken();
    if (!token) {
      return true;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    return this.jwtHelper.isTokenExpired(token);
  }
}
