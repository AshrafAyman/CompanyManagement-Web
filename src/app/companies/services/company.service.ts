import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'https://localhost:7293/api/companies';
  constructor(private http: HttpClient) { }

  getCompanies(Page_size: number = 10, Current_page: number = 1, SortBy: string | undefined = undefined): Observable<any> {
    const params = new HttpParams()
      .set('sortBy', SortBy ?? "")
      .set('Page_size', Page_size)
      .set('Current_page', Current_page);
    return this.http.get<any>(`${this.apiUrl}/all`, { params });
  }

  getCompanyById(id: string): Observable<Company> {
    const params = new HttpParams()
      .set('CompanyId', id);
    return this.http.get<Company>(`${this.apiUrl}`, { params });
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, company);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.apiUrl}`, company);
  }

  deleteCompany(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}`, {
      body: {
        companyId: id
      }
    });
  }
}
