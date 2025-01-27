import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './middleware/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadComponent: async () => (await import('./pages/authentication/authentication.component')).AuthenticationComponent,
    },
    {
        canActivate: [AuthGuard],
        path: 'beranda',
        loadComponent: async () => (await import('./pages/beranda/beranda.component')).BerandaComponent,
    },
    {
        canActivate: [AuthGuard],
        path: 'materi',
        loadComponent: async () => (await import('./pages/materi/materi.component')).MateriComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
