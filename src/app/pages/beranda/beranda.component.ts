import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MainComponent } from 'src/app/components/layout/main/main.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-beranda',
    standalone: true,
    imports: [
        MainComponent,
    ],
    templateUrl: './beranda.component.html',
    styleUrl: './beranda.component.scss'
})
export class BerandaComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

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
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        // this._authenticationService
        //     .getProfile()
        //     .pipe(takeUntil(this.Destroy$))
        //     .subscribe((result) => {
        //         if (result.status) {
        //             !environment.production && console.log("profile =>", result.data);
        //         }
        //     })
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleNavigateMenu(url: string) {
        this._router.navigateByUrl(url);
    }
}
