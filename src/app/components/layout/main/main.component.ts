import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        NgIf,
        NavbarComponent
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    IsAuthenticationPage = false;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _authenticationService: AuthenticationService,
    ) {
        this._activatedRoute
            .url
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.IsAuthenticationPage = result.length ? false : true;
            });
    }

    ngOnInit(): void {
        const url = this._router.url;

        if (url != '/' && !this._authenticationService.Profile$.value) {
            this._authenticationService
                .getProfile()
                .pipe(takeUntil(this.Destroy$))
                .subscribe((result) => {
                    console.log("profile =>", result);
                })
        }
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
