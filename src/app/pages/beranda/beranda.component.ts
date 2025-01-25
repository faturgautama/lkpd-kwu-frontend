import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MainComponent } from 'src/app/components/layout/main/main.component';

@Component({
    selector: 'app-beranda',
    standalone: true,
    imports: [
        MainComponent,
    ],
    templateUrl: './beranda.component.html',
    styleUrl: './beranda.component.scss'
})
export class BerandaComponent {

    Menu = [
        {
            id: 'materi',
            url: '/materi',
            title: 'Materi',
            icon: 'pi pi-file',
        },
        {
            id: 'kuis',
            url: '/kuis',
            title: 'Kuis',
            icon: 'pi pi-pen-to-square',
        },
        {
            id: 'proyek',
            url: '/proyek',
            title: 'Proyek',
            icon: 'pi pi-warehouse',
        },
        {
            id: 'nilai',
            url: '/nilai',
            title: 'Nilai',
            icon: 'pi pi-trophy',
        },
        {
            id: 'referensi',
            url: '/referensi',
            title: 'Referensi',
            icon: 'pi pi-file-check',
        },
        {
            id: 'profile',
            url: '/profile',
            title: 'Profile',
            icon: 'pi pi-user-edit',
        },
    ];

    constructor(
        private _router: Router,
    ) { }

    handleNavigateMenu(url: string) {
        this._router.navigateByUrl(url);
    }
}
