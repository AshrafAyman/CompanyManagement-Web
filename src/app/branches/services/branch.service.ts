import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch } from '../models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = 'https://localhost:7293/api/branches';
  constructor(private http: HttpClient) { }

  getBranches(Page_size: number = 10, Current_page: number = 1, SortBy: string | undefined = undefined): Observable<any> {
    const params = new HttpParams()
      .set('sortBy', SortBy ?? "")
      .set('Page_size', Page_size)
      .set('Current_page', Current_page);

    return this.http.get<any>(`${this.apiUrl}/all`, { params });
  }

  getBranchById(id: string): Observable<Branch> {
    const params = new HttpParams()
      .set('Id', id);
    return this.http.get<Branch>(`${this.apiUrl}`, { params });
  }

  updateBranch(branch: Branch): Observable<Branch> {
    return this.http.put<Branch>(`${this.apiUrl}`, branch);
  }

  deleteBranch(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}`, {
      body: {
        Id: id
      }
    });
  }
}
