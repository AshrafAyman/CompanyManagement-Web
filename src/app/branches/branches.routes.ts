import { Routes } from "@angular/router";
import { authGuard } from "../core/guards/auth.guard";
import { UpdateBranchComponent } from "./components/update-branch/update-branch.component";
import { BranchListComponent } from "./components/branch-list/branch-list.component";

export const BRANCHES_ROUTES: Routes = [
    {
        path: 'update/:id',
        component: UpdateBranchComponent,
        canActivate: [authGuard]
    },
    {
        path: '',
        component: BranchListComponent,
        canActivate: [authGuard]
    }
];