import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Subject, takeUntil } from 'rxjs';
import { MainComponent } from 'src/app/components/layout/main/main.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        CommonModule,
        MainComponent,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        PasswordModule,
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {

    Destroy$ = new Subject();

    IsGuru = false;

    Form: FormGroup;

    Version = environment.version;

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _authenticationService: AuthenticationService,
    ) {
        this.Form = this._formBuilder.group({
            nama_lengkap: ["", [Validators.required]],
            no_absen: ["", [Validators.required]],
            nip: ["", [Validators.required]],
            email: ["", [Validators.required]],
            password: ["", [Validators.required]],
        })
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getProfile();
        }, 500);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getProfile() {
        this._authenticationService.getProfile()
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.IsGuru = result.data.is_guru;
                this.Form.patchValue(result.data);
            })
    }

    handleUpdateProfile(args: any) {
        this._authenticationService
            .updateProfile(args)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Profile berhasil diperbarui' });
                    this.getProfile();
                }
            })
    }

    handleSignOut() {
        this._utilityService.ShowLoading$.next(true);

        setTimeout(() => {
            this._utilityService.ShowLoading$.next(false);
            this._messageService.clear();
            this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Sign Out Berhasil' });
            this._router.navigateByUrl("/");
            this._authenticationService.Profile$.next(null);
            localStorage.clear();
        }, 2000);
    }
}
