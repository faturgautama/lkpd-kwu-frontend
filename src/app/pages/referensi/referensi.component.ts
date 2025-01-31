import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Subject, takeUntil } from 'rxjs';
import { MainComponent } from 'src/app/components/layout/main/main.component';
import { KelasModel } from 'src/app/model/kelas.model';
import { ReferensiModel } from 'src/app/model/referensi.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { KelasService } from 'src/app/services/kelas.service';
import { ReferensiService } from 'src/app/services/referensi.service';

@Component({
    selector: 'app-referensi',
    standalone: true,
    imports: [
        CommonModule,
        MainComponent,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        InputTextareaModule,
    ],
    templateUrl: './referensi.component.html',
    styleUrl: './referensi.component.scss'
})
export class ReferensiComponent implements OnInit, AfterViewInit, OnDestroy {

    Destroy$ = new Subject();

    Profile$ = this._authenticationService
        .Profile$
        .pipe(takeUntil(this.Destroy$));

    IsGuru = false;

    KelasDatasource: KelasModel.IKelas[] = [];

    Referensi: ReferensiModel.IReferensi[] = [];

    IsShowForm = false;

    IsFormEdit = false;

    Form: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _kelasService: KelasService,
        private _referensiService: ReferensiService,
        private _messageService: MessageService,
        private _authenticationService: AuthenticationService,
    ) {
        this.Form = this._formBuilder.group({
            id_referensi: [0, [Validators.required]],
            judul: ["", [Validators.required]],
            deskripsi: ["", [Validators.required]],
            link: ["", [Validators.required]],
        })
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getAllReferensi();
        }, 500);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAllReferensi() {
        this.Profile$
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.IsGuru = result.is_guru;

                this._referensiService
                    .getAll({})
                    .pipe(takeUntil(this.Destroy$))
                    .subscribe((result) => {
                        if (result.status) {
                            this.Referensi = result.data;
                        }
                    })
            })
    }

    handleSaveReferensi(args: any) {
        const { id_referensi, ...payload } = args;

        this._referensiService
            .create(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Referensi berhasil disimpan' });
                    this.Form.reset();
                    this.IsFormEdit = false;
                    this.IsShowForm = false;
                    this.getAllReferensi();
                }
            })
    }

    handleClickButtonEdit(id_referensi: any) {
        this._referensiService
            .getById(id_referensi)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.IsFormEdit = true;
                    this.IsShowForm = true;
                    this.Form.patchValue(result.data);
                }
            })
    }

    handleUpdateReferensi(args: any) {
        this._referensiService
            .update(args)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Referensi berhasil diperbarui' });
                    this.Form.reset();
                    this.IsFormEdit = false;
                    this.IsShowForm = false;
                    this.getAllReferensi();
                }
            })
    }

    handleDeleteReferensi(id_referensi: number) {
        this._referensiService
            .delete(id_referensi)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Referensi berhasil dihapus' });
                    this.getAllReferensi();
                }
            })
    }

    handleOpenReferensi(id_referensi: number) {
        this._referensiService
            .getById(id_referensi)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    window.open(result.data.link);
                }
            })
    }

}
