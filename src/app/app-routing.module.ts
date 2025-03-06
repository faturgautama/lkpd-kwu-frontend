import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './middleware/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadComponent: async () => (await import('./pages/authentication/authentication.component')).AuthenticationComponent,
    },
    {
        path: 'beranda',
        redirectTo: 'kuis',
        pathMatch: 'full'
    },
    {
        canActivate: [AuthGuard],
        path: 'kuis',
        loadComponent: async () => (await import('./pages/kuis/kuis.component')).KuisComponent,
    },
    {
        canActivate: [AuthGuard],
        path: 'materi',
        loadComponent: async () => (await import('./pages/materi/materi.component')).MateriComponent,
    },
    {
        canActivate: [AuthGuard],
        path: 'referensi',
        loadComponent: async () => (await import('./pages/referensi/referensi.component')).ReferensiComponent,
    },
    {
        canActivate: [AuthGuard],
        path: 'tugas',
        loadComponent: async () => (await import('./pages/kuis/kuis.component')).KuisComponent,
    },
    {
        canActivate: [AuthGuard],
        path: 'profile',
        loadComponent: async () => (await import('./pages/profile/profile.component')).ProfileComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
