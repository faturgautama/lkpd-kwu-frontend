import { CommonModule, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    Profile$ = this._authenticationService
        .Profile$
        .pipe(takeUntil(this.Destroy$));

    IsBerandaPage = true;

    Menu: any[] = [
        { path: 'kuis', caption: 'Kuis' },
        { path: 'materi', caption: 'Materi' },
        { path: 'referensi', caption: 'Referensi' },
        { path: 'tugas', caption: 'Tugas' },
        { path: 'profile', caption: 'Profil' },
    ];

    SelectedMenu: any;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _authenticationService: AuthenticationService
    ) {
        this._activatedRoute
            .url
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.IsBerandaPage = result[0].path.includes('beranda') ? true : false;
            });
    }

    ngOnInit(): void {
        if (localStorage.getItem("_EMODULMNS_")) {
            this.SelectedMenu = localStorage.getItem("_EMODULMNS_");
        }
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleBackToBeranda() {
        this._router.navigateByUrl('/beranda');
    }

    handleNavigate(url: string) {
        this.SelectedMenu = url;
        localStorage.setItem("_EMODULMNS_", url);
        this._router.navigateByUrl(`/${url}`);
    }
}
