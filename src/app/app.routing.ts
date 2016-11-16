import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthComponent} from "./auth/auth.component";
import {MainChannelComponent} from './main-channel/main-channel.component';
import {PrivateChannelComponent} from './private-channel/private-channel.component';

const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'chat', component: MainChannelComponent},
  {path: 'room/:roomId/:partnerId', component: PrivateChannelComponent},
  {path: '**', redirectTo: ''}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
