import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainComponent } from 'src/app/components/layout/main/main.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, takeUntil } from 'rxjs';
import { MateriService } from 'src/app/services/materi.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MateriModel } from 'src/app/model/materi.model';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { KelasService } from 'src/app/services/kelas.service';
import { KelasModel } from 'src/app/model/kelas.model';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-materi',
    standalone: true,
    imports: [
        CommonModule,
        MainComponent,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        InputTextModule,
        ButtonModule,
    ],
    templateUrl: './materi.component.html',
    styleUrl: './materi.component.scss'
})
export class MateriComponent implements OnInit, AfterViewInit, OnDestroy {

    Destroy$ = new Subject();

    Profile$ = this._authenticationService
        .Profile$
        .pipe(takeUntil(this.Destroy$));

    IsGuru = false;

    KelasDatasource: KelasModel.IKelas[] = [];

    Materi: MateriModel.IMateri[] = [];

    IsShowForm = false;

    IsFormEdit = false;

    Form: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _kelasService: KelasService,
        private _materiService: MateriService,
        private _messageService: MessageService,
        private _authenticationService: AuthenticationService,
    ) {
        this.Form = this._formBuilder.group({
            id_materi: [0, [Validators.required]],
            id_kelas: [0, [Validators.required]],
            judul: ["", [Validators.required]],
            file_name: ["", [Validators.required]],
            file_base_64: ["", [Validators.required]],
        })
    }

    ngOnInit(): void {
        this.getAllKelas();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getAllMateri();
        }, 500);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    private getAllKelas() {
        this._kelasService
            .getAll()
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.KelasDatasource = result.data;
                }
            })
    }

    private getAllMateri() {
        this.Profile$
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.IsGuru = result.is_guru;

                let query: any = {};

                if (!result.is_guru) {
                    query.id_kelas = result.id_kelas;
                }

                this._materiService
                    .getAll(query)
                    .pipe(takeUntil(this.Destroy$))
                    .subscribe((result) => {
                        if (result.status) {
                            this.Materi = result.data;
                        }
                    })
            })
    }

    handleChangeFile(args: any) {
        const file = args.target.files[0];

        console.log("file =>", file);

        if (file) {
            if (file.size / (1024 * 1024) > 10) {
                this._messageService.clear();
                this._messageService.add({ severity: 'warning', summary: 'Oops', detail: 'Ukuran file tidak boleh lebih dari 10MB' })
            } else {
                const reader = new FileReader();

                reader.onload = () => {
                    this.Form.get('file_name')?.setValue(file.name);

                    const base64string = (reader.result as string).toString().split(",")[1];
                    this.Form.get('file_base_64')?.setValue(base64string);
                };

                reader.readAsDataURL(file);
            }
        }
    }

    handleSaveMateri(args: any) {
        const { id_materi, ...payload } = args;

        this._materiService
            .create(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Materi berhasil disimpan' });
                    this.Form.reset();
                    this.IsFormEdit = false;
                    this.IsShowForm = false;
                    this.getAllMateri();
                }
            })
    }

    handleClickButtonEdit(id_materi: any) {
        this._materiService
            .getById(id_materi)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.IsFormEdit = true;
                    this.IsShowForm = true;
                    this.Form.patchValue(result.data);
                }
            })
    }

    handleUpdateMateri(args: any) {
        this._materiService
            .update(args)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Materi berhasil diperbarui' });
                    this.Form.reset();
                    this.IsFormEdit = false;
                    this.IsShowForm = false;
                    this.getAllMateri();
                }
            })
    }

    handleDeleteMateri(id_materi: number) {
        this._materiService
            .delete(id_materi)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Materi berhasil dihapus' });
                    this.getAllMateri();
                }
            })
    }

    handleOpenMateri(id_materi: number) {
        this._materiService
            .getById(id_materi)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    const link = document.createElement("a");
                    const blob = new Blob([Uint8Array.from(atob(result.data.file_base_64!), (c) => c.charCodeAt(0))], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
                    const url = URL.createObjectURL(blob);
                    link.href = url;
                    link.download = result.data.file_name;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            })
    }
}
