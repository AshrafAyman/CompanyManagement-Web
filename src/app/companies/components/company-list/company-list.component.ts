import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent {
  companies: Company[] = [];

  constructor(
    private companyService: CompanyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(response => {
      this.companies = []
      this.companies = response.companies;
    });
  }

  updateCompany(id: string) {
    this.router.navigate(['/companies/update', id]);
  }

  deleteCompany(id: string) {
    this.companyService.deleteCompany(id).subscribe({
      next: () => {
        this.getCompanies();
      },
      error: (error) => {
        alert(error.error)
      }
    });
  }

  navigateToCreateCompany() {
    this.router.navigate(['/companies/create']);
  }
  navigateToBranches() {
    this.router.navigate(['/branches']);
  }
}
