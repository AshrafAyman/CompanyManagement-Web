import { Component } from '@angular/core';
import { Branch } from '../../models/branch.model';
import { BranchService } from '../../services/branch.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-branch-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './branch-list.component.html',
  styleUrl: './branch-list.component.scss'
})
export class BranchListComponent {
  branches: Branch[] = [];

  constructor(
    private branchService: BranchService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getBranches();
  }

  getBranches() {
    this.branchService.getBranches().subscribe(response => {
      this.branches = [];
      this.branches = response.branches;
    });
  }

  updateBranch(id: string) {
    this.router.navigate(['/branches/update', id]);
  }

  deleteBranch(id: string) {
    this.branchService.deleteBranch(id).subscribe({
      next: () => {
        this.getBranches();
      },
      error: (error) => {
        alert(error.error)
      }
    }
    );
  }
  navigateToCompanies() {
    this.router.navigate(['/companies']);
  }
}
