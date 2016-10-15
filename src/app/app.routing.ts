import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthComponent} from "./auth/auth.component";

const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'auth', component: AuthComponent}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
