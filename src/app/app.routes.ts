import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'companies',
  },
  {
    path: 'identity',
    loadChildren: () =>
      import('./identity/identity.routes').then((mod) => mod.AUTH_ROUTES),
  },
  {
    path: 'companies',
    loadChildren: () =>
      import('./companies/companies.routes').then((mod) => mod.COMPANIES_ROUTES),
  },
  {
    path: 'branches',
    loadChildren: () =>
      import('./branches/branches.routes').then((mod) => mod.BRANCHES_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
