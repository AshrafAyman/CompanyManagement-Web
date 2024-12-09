import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from '../../models/company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-update-company',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './update-company.component.html',
  styleUrl: './update-company.component.scss'
})
export class UpdateCompanyComponent implements OnInit {
  companyForm: FormGroup;
  company: Company | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      branchAddress: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getCompany();
  }

  getCompany() {
    const id = this.route.snapshot.paramMap.get('id') ?? "";
    if (id == null || id == undefined || id == '') {
      this.router.navigate(['/companies']);
    }
    this.companyService.getCompanyById(id).subscribe(company => {
      this.company = company;
      this.companyForm.patchValue({
        name: company.name,
        email: company.email,
        branchAddress: company.branchAddress
      });
    });
  }

  updateCompany() {
    if (this.companyForm.valid) {
      this.companyService.updateCompany({ ...this.company, ...this.companyForm.value }).subscribe(() => {
        this.router.navigate(['/companies']);
      });
    }
  }
}
