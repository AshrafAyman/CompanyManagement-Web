import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Branch } from '../../models/branch.model';
import { BranchService } from '../../services/branch.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-branch',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './update-branch.component.html',
  styleUrl: './update-branch.component.scss'
})
export class UpdateBranchComponent {
  branchForm: FormGroup;
  branch: Branch | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private branchService: BranchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.branchForm = this.formBuilder.group({
      branchAddress: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getBranch();
  }

  getBranch() {
    const id = this.route.snapshot.paramMap.get('id') ?? "";
    if (id == null || id == undefined || id == '') {
      this.router.navigate(['/branches']);
    }

    this.branchService.getBranchById(id).subscribe(branch => {
      this.branch = branch;
      this.branchForm.patchValue({ branchAddress: branch.branchAddress });
    });
  }

  updateBranch() {
    if (this.branchForm.valid) {
      this.branchService.updateBranch({ ...this.branch, ...this.branchForm.value }).subscribe(() => {
        this.router.navigate(['/branches']);
      });
    }
  }
}
