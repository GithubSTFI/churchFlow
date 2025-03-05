import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './core/guards/guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'appointments',
        loadChildren: () => import('./features/appointments/appointments.module').then(m => m.AppointmentsModule)
      },
      {
        path: 'events',
        loadChildren: () => import('./features/events/events.module').then(m => m.EventsModule)
      },
      {
        path: 'members',
        loadChildren: () => import('./features/members/members.module').then(m => m.MembersModule)
      },
      {
        path: 'finances',
        loadChildren: () => import('./features/finances/finances.module').then(m => m.FinancesModule)
      },
      {
        path: 'resources',
        loadChildren: () => import('./features/resources/resources.module').then(m => m.ResourcesModule)
      },
      {
        path: 'communication',
        loadChildren: () => import('./features/communication/communication.module').then(m => m.CommunicationModule)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
