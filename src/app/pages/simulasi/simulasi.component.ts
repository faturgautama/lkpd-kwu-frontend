import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Subject, takeUntil } from 'rxjs';
import { MainComponent } from 'src/app/components/layout/main/main.component';
import { KelasModel } from 'src/app/model/kelas.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { KelasService } from 'src/app/services/kelas.service';
import { SimulasiService } from 'src/app/services/simulasi.service';
import { SiswaService } from 'src/app/services/siswa.service';
import { VoiceNoteService } from 'src/app/services/voice-note.service';

@Component({
    selector: 'app-simulasi',
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
        CalendarModule,
        InputNumberModule,
        EditorModule
    ],
    templateUrl: './simulasi.component.html',
    styleUrl: './simulasi.component.scss'
})
export class SimulasiComponent implements OnInit, AfterViewInit, OnDestroy {

    Destroy$ = new Subject();

    Profile$ = this._authenticationService
        .Profile$
        .pipe(takeUntil(this.Destroy$));

    IsGuru = false;

    KelasDatasource: KelasModel.IKelas[] = [];
    SelectedKelas: any;

    SiswaDatasource: any[] = [];
    SelectedSiswa: any;

    SimulasiDatasource: any;
    SimulasiSections = [
        { label: 'Petunjuk Pengerjaan', value: 'petunjuk_pengerjaan' },
        { label: 'Bahan Dan Alat', value: 'bahan_dan_alat' },
        { label: 'Hasil Yg Diharapkan', value: 'hasil_yang_diharapkan' },
        { label: 'Ilustrasi', value: 'ilustrasi' },
        { label: 'Jawaban Simulasi', value: 'jawaban_simulasi' },
    ];

    SelectedSimulasiSections: string = 'petunjuk_pengerjaan'

    Nilai: any;

    Form: FormGroup;

    TypeJawaban: any[] = [
        { label: 'LPT', value: 'lpt' },
        { label: 'Block Note', value: 'block_note' },
    ]

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _kelasService: KelasService,
        private _siswaService: SiswaService,
        private _messageService: MessageService,
        private _simulasiService: SimulasiService,
        private _recorderService: VoiceNoteService,
        private _authenticationService: AuthenticationService,
    ) {
        this.Form = this._formBuilder.group({
            id_simulasi: [0, [Validators.required]],
            id_siswa: [0, [Validators.required]],
            untuk: ["", [Validators.required]],
            dept: ["", [Validators.required]],
            tanggal: ["", [Validators.required]],
            waktu: ["", [Validators.required]],
            dari: ["", [Validators.required]],
            perusahaan: ["", [Validators.required]],
            telepon: ["", [Validators.required]],
            isi_pesan: ["", [Validators.required]],
            keterangan: ["", [Validators.required]],
            nama_penerima: ["", [Validators.required]],
            link_video_youtube: ["", [Validators.required]],
            nilai: [0, [Validators.required]],
            type: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.getAllKelas();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getAllSimulasi();
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

    getAllSimulasi() {
        this.Profile$
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                const userData = JSON.parse(localStorage.getItem("_LPKDUD_") as any);
                this.IsGuru = result.is_guru;

                let query: any = {};

                if (!result.is_guru) {
                    query.id_kelas = result.id_kelas;
                    query.id_siswa = userData.id_siswa;
                    this.Form.get('id_siswa')?.setValue(result.id_siswa);
                    this.Form.get('nama_penerima')?.setValue(result.nama_lengkap);
                } else {
                    query.id_kelas = this.SelectedKelas;
                    query.id_siswa = this.SelectedSiswa;
                }

                if (query.id_kelas && query.id_siswa) {
                    this._simulasiService
                        .getAll(query)
                        .pipe(takeUntil(this.Destroy$))
                        .subscribe((result) => {
                            if (result.status) {
                                this.SimulasiDatasource = result.data;
                                this.Form.get('id_simulasi')?.setValue(result.data.id_simulasi);

                                if (result.data.jawaban_simulasi) {
                                    result.data.jawaban_simulasi.tanggal = new Date(result.data.jawaban_simulasi.tanggal);
                                    result.data.jawaban_simulasi.waktu = new Date(result.data.jawaban_simulasi.waktu);
                                    this.Form.patchValue(result.data.jawaban_simulasi);

                                    if (this.IsGuru) {
                                        this.Nilai = result.data.jawaban_simulasi.nilai;
                                    }

                                    this.SimulasiSections = [
                                        { label: 'Petunjuk Pengerjaan', value: 'petunjuk_pengerjaan' },
                                        { label: 'Bahan Dan Alat', value: 'bahan_dan_alat' },
                                        { label: 'Hasil Yg Diharapkan', value: 'hasil_yang_diharapkan' },
                                        { label: 'Ilustrasi', value: 'ilustrasi' },
                                        { label: 'Jawaban Simulasi', value: 'jawaban_simulasi' },
                                        { label: 'Upload Video', value: 'video_youtube' },
                                    ];
                                } else {
                                    this.SimulasiSections = [
                                        { label: 'Petunjuk Pengerjaan', value: 'petunjuk_pengerjaan' },
                                        { label: 'Bahan Dan Alat', value: 'bahan_dan_alat' },
                                        { label: 'Hasil Yg Diharapkan', value: 'hasil_yang_diharapkan' },
                                        { label: 'Ilustrasi', value: 'ilustrasi' },
                                        { label: 'Jawaban Simulasi', value: 'jawaban_simulasi' },
                                    ];
                                }
                            }
                        })
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

    handleChangeSiswa(args: any) {
        if (args.value) {
            this.getAllSimulasi();
        }
    }

    handleClickSectionSimulasi(type: string) {
        this.SelectedSimulasiSections = type;
    }

    handleSaveSimulasi(args: any) {
        this._simulasiService
            .update(args)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Simulasi berhasil disimpan' });
                    this.getAllSimulasi();
                }
            })
    }

    handleUpdateNilai(nilai: any) {
        const payload = {
            ...this.Form.value,
            nilai: nilai
        };

        this._simulasiService
            .update(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Nilai berhasil disimpan' });
                    this.handleChangeSiswa({ value: this.SelectedSiswa })
                }
            });
    }

}
