import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.scss'
})
export class CreateCompanyComponent {
  companyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private companyService: CompanyService
  ) {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      branchAddress: ['', Validators.required]
    });
  }

  createCompany() {
    if (this.companyForm.valid) {
      this.companyService.createCompany(this.companyForm.value).subscribe();
      this.router.navigate(['/companies']);
    }
  }
}
