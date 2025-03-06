import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainComponent } from "../../components/layout/main/main.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-authentication',
    standalone: true,
    imports: [
        NgIf,
        MainComponent,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
    ],
    templateUrl: './authentication.component.html',
    styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    IsGuru = true;

    IsRegister = false;

    Form: FormGroup;

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _messageService: MessageService,
        private _authenticationService: AuthenticationService,
    ) {
        this.Form = this._formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            nama_lengkap: ['', []],
            is_guru: [false, []]
        });
    }

    ngOnInit(): void {
        this.Form.get('email')?.setValue('guru@email.com');
        this.Form.get('password')?.setValue('1234');
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleToggleIsGuru(is_guru: boolean) {
        this.IsGuru = is_guru;

        if (this.IsGuru) {
            this.Form.get('email')?.setValue('guru@email.com');
            this.Form.get('password')?.setValue('1234');
        } else {
            this.Form.get('email')?.setValue('siswa@email.com');
            this.Form.get('password')?.setValue('1234');
        }
    }

    handleSignIn(args: any) {
        const payload = {
            email: args.email,
            password: args.password
        };

        this._authenticationService
            .signIn(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Sign In Berhasil', });
                    this._router.navigateByUrl("/beranda");
                }
            })
    }

    handleRegister(args: any) {
        const payload = {
            email: args.email,
            password: args.password,
            nama_lengkap: args.nama_lengkap,
            is_guru: this.IsGuru
        };

        this._authenticationService
            .signIn(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Register Berhasil', detail: 'Anda Dapat Sign In Sekarang' });
                    this.IsRegister = false;
                }
            })
    }
}
