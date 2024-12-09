import { Routes } from "@angular/router";
import { authGuard } from "../core/guards/auth.guard";
import { CompanyListComponent } from "./components/company-list/company-list.component";
import { CreateCompanyComponent } from "./components/create-company/create-company.component";
import { UpdateCompanyComponent } from "./components/update-company/update-company.component";

export const COMPANIES_ROUTES: Routes = [
    {
        path: 'create',
        component: CreateCompanyComponent,
        canActivate: [authGuard]
    },
    {
        path: 'update/:id',
        component: UpdateCompanyComponent,
        canActivate: [authGuard]
    },
    {
        path: '',
        component: CompanyListComponent,
        canActivate: [authGuard]
    }
];