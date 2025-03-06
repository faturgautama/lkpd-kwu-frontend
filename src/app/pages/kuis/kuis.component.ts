import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { of, Subject, takeUntil } from 'rxjs';
import { MainComponent } from 'src/app/components/layout/main/main.component';
import { KelasModel } from 'src/app/model/kelas.model';
import { KuisModel } from 'src/app/model/kuis.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { KelasService } from 'src/app/services/kelas.service';
import { KuisService } from 'src/app/services/kuis.service';
import { environment } from 'src/environments/environment';
import { SiswaService } from 'src/app/services/siswa.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-kuis',
    standalone: true,
    imports: [
        CommonModule,
        MainComponent,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        InputTextModule,
        ButtonModule,
        InputTextareaModule,
        RadioButtonModule,
        CalendarModule
    ],
    templateUrl: './kuis.component.html',
    styleUrl: './kuis.component.scss'
})
export class KuisComponent implements OnInit, AfterViewInit, OnDestroy {

    Destroy$ = new Subject();

    Profile$ = this._authenticationService
        .Profile$
        .pipe(takeUntil(this.Destroy$));

    IsGuru = false;

    KelasDatasource: KelasModel.IKelas[] = [];

    SiswaDatasource: any[] = [];

    SelectedSiswa: any;

    Kuis: any;

    Pertanyaan: any[] = [
        {
            id_pertanyaan: 0,
            pertanyaan: '',
            option_a: '',
            option_b: '',
            option_c: '',
            option_d: '',
            option_e: '',
            correct: '',
            jawaban: ''
        },
        {
            id_pertanyaan: 0,
            pertanyaan: '',
            option_a: '',
            option_b: '',
            option_c: '',
            option_d: '',
            option_e: '',
            correct: '',
            jawaban: ''
        },
        {
            id_pertanyaan: 0,
            pertanyaan: '',
            option_a: '',
            option_b: '',
            option_c: '',
            option_d: '',
            option_e: '',
            correct: '',
            jawaban: ''
        },
        {
            id_pertanyaan: 0,
            pertanyaan: '',
            option_a: '',
            option_b: '',
            option_c: '',
            option_d: '',
            option_e: '',
            correct: '',
            jawaban: ''
        },
        {
            id_pertanyaan: 0,
            pertanyaan: '',
            option_a: '',
            option_b: '',
            option_c: '',
            option_d: '',
            option_e: '',
            correct: '',
            jawaban: ''
        }
    ];

    PageState: 'list' | 'guru' | 'siswa' | 'hasil' = 'list';

    KategoriKuis: 'PRE TEST' | 'POST TEST' = this._router.url.includes('kuis') ? 'PRE TEST' : 'POST TEST';

    IsShowForm = false;
    IsFormEdit = false;
    Form: FormGroup;

    SelectedKuis: any;

    SelectedPertanyaan: any;
    SelectedIndexPertanyaan!: number;

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _kuisService: KuisService,
        private _kelasService: KelasService,
        private _siswaService: SiswaService,
        private _messageService: MessageService,
        private _authenticationService: AuthenticationService,
    ) {
        this.Form = this._formBuilder.group({
            id_kuis: [0, [Validators.required]],
            id_kelas: [0, [Validators.required]],
            judul: ["", [Validators.required]],
            kategori_kuis: ["", [Validators.required]],
            start_date: [null, []],
            end_date: [null, []],
            deskripsi: ["", [Validators.required]],
            is_active: [true, [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.getAllKelas();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getAllKuis();
        }, 500);
    }

    ngOnDestroy(): void {
        localStorage.removeItem("_LKPD_SK_");
        localStorage.removeItem("_LKPD_QS_");
        localStorage.removeItem("_LKPD_QSS_");
        localStorage.removeItem("_LKPD_QSSI_");
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

    private getAllKuis() {
        this.Profile$
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                const userData = JSON.parse(localStorage.getItem("_LPKDUD_") as any);
                this.IsGuru = result.is_guru;

                let query: any = {};

                if (!result.is_guru) {
                    query.id_kelas = result.id_kelas;
                    query.id_siswa = userData.id_siswa;
                    query.kategori = this.KategoriKuis;

                    if (localStorage.getItem("_LKPD_SK_")) {
                        this.IsShowForm = true;
                        this.PageState = 'siswa';
                        this.SelectedKuis = JSON.parse(localStorage.getItem("_LKPD_SK_") as any);
                        this.Pertanyaan = JSON.parse(localStorage.getItem("_LKPD_QS_") as any);
                        this.SelectedPertanyaan = JSON.parse(localStorage.getItem("_LKPD_QSS_") as any);
                        this.SelectedIndexPertanyaan = JSON.parse(localStorage.getItem("_LKPD_QSSI_") as any);
                    }
                } else {
                    query.id_kelas = 1;
                    query.id_siswa = 1;
                    query.kategori = this.KategoriKuis;
                }

                this._kuisService
                    .getAll(query)
                    .pipe(takeUntil(this.Destroy$))
                    .subscribe((result) => {
                        if (result.status) {
                            if (result.data.length) {
                                this.getDetailKuis(result.data[0].id_kuis, query.id_siswa);
                            }
                        }
                    })
            })
    }

    private getDetailKuis(id_kuis: any, id_siswa: any) {
        this._kuisService
            .getAnswerSiswa(id_kuis, id_siswa)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.data) {
                    result.data.pertanyaan = result.data.pertanyaan.map((item: any) => {
                        return {
                            ...item,
                            jawaban: item.id_jawaban ? item.jawaban : ''
                        }
                    });

                    this.Kuis = result.data;
                }
            })
    }

    handleChangeKelas(args: any) {
        if (args.value) {
            this._siswaService
                .getAll({ id_kelas: args.value })
                .pipe(takeUntil(this.Destroy$))
                .subscribe((result) => {
                    if (result.status) {
                        this.SiswaDatasource = result.data;
                    }
                })
        }
    }

    handleSaveKuis(args: any) {
        let { id_kuis, is_active, ...payload } = args;
        payload.pertanyaan = this.Pertanyaan;

        this._kuisService
            .create(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Kuis berhasil disimpan' });
                    this.Form.reset();
                    this.IsFormEdit = false;
                    this.IsShowForm = false;
                    this.PageState = 'list';
                    this.getAllKuis();
                }
            })
    }

    handleClickButtonEdit(id_kuis: any) {
        this._kuisService
            .getById(id_kuis)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.IsFormEdit = true;
                    this.IsShowForm = true;
                    this.PageState = 'guru';
                    this.Form.patchValue(result.data);
                    this.Pertanyaan = result.data.pertanyaan;
                }
            })
    }

    handleBackToListKuis() {
        this.IsShowForm = false;
        this.PageState = 'list';
        this.IsFormEdit = false;
        localStorage.removeItem("_LKPD_SK_");
        localStorage.removeItem("_LKPD_QS_");
        localStorage.removeItem("_LKPD_QSS_");
        localStorage.removeItem("_LKPD_QSSI_");

        this.SelectedKuis = null;
        this.Pertanyaan = [];
        this.SelectedPertanyaan = null;
        this.SelectedIndexPertanyaan = 0;

        this.getAllKuis();
    }

    handleUpdateKuis(args: any) {
        this._kuisService
            .update(args)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Kuis berhasil diperbarui' });
                    this.Form.reset();
                    this.IsFormEdit = false;
                    this.IsShowForm = false;
                    this.PageState = 'list';
                    this.getAllKuis();
                }
            })
    }

    handleDeleteKuis(args: any) {
        const payload = {
            id_kuis: args.id_kuis,
            id_kelas: args.id_kelas,
            judul: args.judul,
            start_date: args.start_date,
            end_date: args.end_date,
            kategori_kuis: args.kategori_kuis,
            deskripsi: args.deskripsi,
            is_active: args.is_active
        };

        this._kuisService
            .delete(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Kuis berhasil dihapus' });
                    this.getAllKuis();
                }
            })
    }

    handleOpenKuisForSiswa(id_kuis: any) {
        this._kuisService
            .getById(id_kuis)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.IsShowForm = true;
                    this.PageState = 'siswa';
                    this.SelectedKuis = result.data;
                    this.Pertanyaan = result.data.pertanyaan.map((item: any) => {
                        return {
                            ...item,
                            jawaban: ""
                        }
                    });
                    this.SelectedPertanyaan = this.Pertanyaan[this.SelectedIndexPertanyaan];
                    localStorage.setItem("_LKPD_SK_", JSON.stringify(this.SelectedKuis));
                    localStorage.setItem("_LKPD_QS_", JSON.stringify(this.Pertanyaan));
                    localStorage.setItem("_LKPD_QSS_", JSON.stringify(this.SelectedPertanyaan));
                    localStorage.setItem("_LKPD_QSSI_", JSON.stringify(this.SelectedIndexPertanyaan));
                }
            })
    }

    handleSubmitPertanyaan(args: any) {
        const userData = JSON.parse(localStorage.getItem('_LPKDUD_') as any)

        const detail_jawaban = args.pertanyaan.map((item: any) => {
            return {
                id_pertanyaan: item.id_pertanyaan,
                id_siswa: userData.id_siswa,
                jawaban: item.jawaban,
                correct: item.correct
            }
        });

        const payload = {
            id_kuis: this.Kuis.id_kuis,
            detail_jawaban: detail_jawaban
        };

        this._kuisService
            .submitJawaban(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Jawaban Berhasil Disimpan' });
                    this.getDetailKuis(this.Kuis.id_kuis, userData.id_siswa);
                }
            })
    }

    handleLihatHasil(args: any) {
        this._kuisService
            .getById(args.id_kuis)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.IsShowForm = true;
                    this.PageState = 'hasil';
                    this.SelectedKuis = result.data;
                    this.Pertanyaan = [];
                    this.getAllSiswa(result.data.id_kelas)
                }
            })
    }

    private getAllSiswa(id_kelas: any) {
        this._siswaService
            .getAll({ id_kelas: id_kelas })
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.SiswaDatasource = result.data;
                }
            })
    }

    handleChangeSiswa(args: any) {
        if (args.value) {
            this._kuisService
                .getAnswerSiswa(this.SelectedKuis.id_kuis, args.value)
                .pipe(takeUntil(this.Destroy$))
                .subscribe((result) => {
                    if (result.status) {
                        console.log(result.data);
                        this.Pertanyaan = result.data.pertanyaan;
                        this.SelectedSiswa = args.value;
                    }
                })
        }
    }

    handlePenilaianSiswa(args: any, is_correct: boolean) {
        const payload = {
            id_kuis: this.SelectedKuis.id_kuis,
            id_siswa: this.SelectedSiswa,
            id_jawaban: args.id_jawaban,
            is_correct: is_correct
        };

        this._kuisService
            .penilaianJawaban(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.handleChangeSiswa({ value: this.SelectedSiswa })
                }
            });
    }

    handleClickSoal(args: any, index: number) {
        this.SelectedPertanyaan = args;
        this.SelectedIndexPertanyaan = index;
    }

    handleNextPrevSoal(action: 'prev' | 'next') {
        if (action == 'prev') {
            this.SelectedIndexPertanyaan = this.SelectedIndexPertanyaan - 1;
            this.SelectedPertanyaan = this.Kuis.pertanyaan[this.SelectedIndexPertanyaan];
        } else {
            this.SelectedIndexPertanyaan = this.SelectedIndexPertanyaan + 1;
            this.SelectedPertanyaan = this.Kuis.pertanyaan[this.SelectedIndexPertanyaan];
        }
    }
}
