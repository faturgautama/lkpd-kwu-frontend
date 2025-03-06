import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Subject, takeUntil } from 'rxjs';
import { MainComponent } from 'src/app/components/layout/main/main.component';
import { KelasModel } from 'src/app/model/kelas.model';
import { ProyekModel } from 'src/app/model/proyek.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { KelasService } from 'src/app/services/kelas.service';
import { ProyekService } from 'src/app/services/proyek.service';
import { SiswaService } from 'src/app/services/siswa.service';
import { EditorModule } from 'primeng/editor';
import { Router } from '@angular/router';

@Component({
    selector: 'app-proyek',
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
    templateUrl: './proyek.component.html',
    styleUrl: './proyek.component.scss'
})
export class ProyekComponent implements OnInit, AfterViewInit, OnDestroy {

    Destroy$ = new Subject();

    PageState: 'list' | 'guru' | 'siswa' | 'hasil' | 'preview' = 'list';

    Profile$ = this._authenticationService
        .Profile$
        .pipe(takeUntil(this.Destroy$));

    IsGuru = false;

    KelasDatasource: KelasModel.IKelas[] = [];

    Proyek: ProyekModel.IProyek[] = [];
    SelectedProyek: any;

    Kelompok: any[] = [];
    SelectedKelompok: any;

    Siswa: any[] = [];

    IsShowForm = false;
    IsFormEdit = false;
    Form: FormGroup;

    IsShowHasil = false;

    Hasil: any;

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _kelasService: KelasService,
        private _siswaService: SiswaService,
        private _proyekService: ProyekService,
        private _messageService: MessageService,
        private _authenticationService: AuthenticationService,
    ) {
        this.Form = this._formBuilder.group({
            id_proyek: [0, []],
            id_kelas: [0, [Validators.required]],
            judul: ["", [Validators.required]],
            deskripsi: ["", [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.getAllKelas();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getAllProyek();
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

    private getAllProyek() {
        this.Profile$
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.IsGuru = result.is_guru;

                let query: any = {};

                if (!result.is_guru) {
                    query.id_kelas = result.id_kelas;
                }

                this._proyekService
                    .getAll(query)
                    .pipe(takeUntil(this.Destroy$))
                    .subscribe((result) => {
                        if (result.status) {
                            this.Proyek = result.data;
                        }
                    })
            })
    }

    handleChangeKelas(args: any) {
        if (args.value) {
            this._siswaService
                .getAll({ id_kelas: args.value })
                .pipe(takeUntil(this.Destroy$))
                .subscribe((result) => {
                    if (result.status) {
                        this.Siswa = result.data.map((item: any) => {
                            return {
                                ...item,
                                id: item.id_siswa,
                                kelompok_proyek: null,
                            }
                        })
                    }
                })
        }
    }

    handleAddKelompok() {
        this.Kelompok.push({
            kelompok_proyek: '',
            detail_siswa: []
        })
    }

    handleEditKelompok(index: number, data: any) {
        this.Kelompok[index] = data;
    }

    handleSaveKelompok(args: any) {
        const payload = {
            id_proyek: this.Form.get('id_proyek')?.value,
            ...args
        };

        this._proyekService
            .createNewKelompok(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Kelompok Berhasil Disimpan' });
                    this.handleClickButtonEdit(this.Form.get('id_proyek')?.value)
                }
            })
    }

    handleUpdateKelompok(args: any) {
        const payload = {
            id_kelompok_proyek: args.id_kelompok_proyek,
            kelompok_proyek: args.kelompok_proyek,
            hasil: args.hasil
        };

        this._proyekService
            .updateHasilKelompok(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Kelompok Berhasil Diperbarui' });
                    this.handleClickButtonEdit(this.Form.get('id_proyek')?.value)
                }
            })
    }

    handleDeleteKelompok(args: any) {
        this._proyekService
            .deleteKelompok(args.id_kelompok_proyek)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Kelompok Berhasil Dihapus' });
                    this.handleClickButtonEdit(this.Form.get('id_proyek')?.value)
                }
            })
    }

    handleAddSiswaKelompok(index: any) {
        this.Kelompok[index].detail_siswa.push({
            id_siswa: 0,
            id_user: 0,
        })
    }

    handleChangeSiswa(args: any, index: number, indexKelompok: number) {
        if (args.value) {
            const indexSiswa = this.Siswa.findIndex(item => item.id == args.value);

            this.Kelompok[indexKelompok].detail_siswa[index] = {
                ...this.Kelompok[indexKelompok].detail_siswa[index],
                id_siswa: this.Siswa[indexSiswa].id_siswa,
                id_user: this.Siswa[indexSiswa].id_user,
            };

            this.Siswa = this.Siswa.map((item: any, indexs: number) => {
                if (indexs == indexSiswa) {
                    item.kelompok_proyek = this.Kelompok[indexKelompok].kelompok_proyek;
                    item.isDisabled = true
                }

                return item;
            })
        }
    }

    handleDeleteSiswa(args: any, index: number, indexKelompok: number) {
        if (args.id_siswa_kelompok_proyek) {
            this._proyekService
                .deleteSiswaKelompok(args.id_siswa_kelompok_proyek)
                .pipe(takeUntil(this.Destroy$))
                .subscribe((result) => {
                    if (result.status) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Siswa Berhasil Dihapus' });
                        this.handleClickButtonEdit(this.Form.get('id_proyek')?.value)
                    }
                })
        } else {
            this.Kelompok[indexKelompok].detail_siswa.splice(index, 1);
        }
    }

    handleSaveSiswa(args: any, kelompok: any,) {
        const payload = {
            id_user: args.id_user,
            id_siswa: args.id_siswa,
            id_kelompok_proyek: kelompok.id_kelompok_proyek
        }

        this._proyekService
            .createSiswaKelompok(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Siswa Berhasil Disimpan' });
                    this.handleClickButtonEdit(this.Form.get('id_proyek')?.value)
                }
            })
    }

    handleUpdateSiswa(args: any, kelompok: any,) {
        const payload = {
            id_user: args.id_user,
            id_siswa: args.id_siswa,
            id_siswa_kelompok_proyek: kelompok.id_siswa_kelompok_proyek
        }

        this._proyekService
            .updateSiswaKelompok(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Siswa Berhasil Diperbarui' });
                    this.handleClickButtonEdit(this.Form.get('id_proyek')?.value)
                }
            })
    }

    handleSaveProyek(args: any) {
        let { id_proyek, is_active, ...payload } = args;
        payload.kelompok = this.Kelompok.map((item: any) => {
            return {
                ...item,
                detail_siswa: item.detail_siswa.map((siswa: any) => {
                    return {
                        id_user: siswa.id_user,
                        id_siswa: siswa.id_siswa
                    }
                })
            }
        });

        this._proyekService
            .create(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Proyek berhasil disimpan' });
                    this.Form.reset();
                    this.IsFormEdit = false;
                    this.IsShowForm = false;
                    this.PageState = 'list';
                    this.getAllProyek();
                }
            })
    }

    handleUpdateProyek(args: any) {
        console.log("payload =>", args);

        this._proyekService
        .update(payload)
        .pipe(takeUntil(this.Destroy$))
        .subscribe((result) => {
            if (result.status) {
                this._messageService.clear();
                this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Proyek berhasil dihapus' });
                this.handleClickButtonEdit(this.Form.get('id_proyek')?.value)
            }
        })
    }

    handleClickButtonEdit(args: any, pagestate?: any) {
        this._proyekService
            .getById(args)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.SelectedProyek = result.data;

                    console.log("selected proyek =>", result.data);

                    this.IsFormEdit = true;
                    this.IsShowForm = true;

                    if (pagestate == 'preview') {
                        this.PageState = pagestate;
                        this.Hasil = { hasil: result.data.deskripsi };
                    }

                    this.Form.patchValue(result.data);

                    this.handleChangeKelas({ value: result.data.id_kelas });

                    console.log("hasil =>", this.Hasil);

                    setTimeout(() => {
                        this.Kelompok = result.data.kelompok_proyek.map((item: any) => {
                            return {
                                ...item,
                                detail_siswa: item.detail_siswa.map((siswa: any) => {
                                    return {
                                        id_siswa_kelompok_proyek: siswa.id_siswa_kelompok_proyek,
                                        id_user: siswa.id_user,
                                        id_siswa: siswa.id_siswa,
                                        id: siswa.id_siswa,
                                        no_absen: siswa.no_absen,
                                        nama_lengkap: siswa.nama_lengkap
                                    }
                                })
                            }
                        });
                    }, 1000);
                }
            })
    }

    handleDeleteProyek(args: any) {
        const payload = {
            id_proyek: args.id_proyek,
            id_kelas: args.id_kelas,
            judul: args.judul,
            deskripsi: args.deskripsi,
            is_active: true,
        }

        this._proyekService
            .delete(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Proyek berhasil dihapus' });
                    this.getAllProyek();
                }
            })
    }

    handleLihatHasil(id_proyek: any) {
        this.handleClickButtonEdit(id_proyek, 'siswa');
        this.IsShowHasil = true;
        this.PageState = 'hasil';

        if (!this.IsGuru) {
            this.getDetailKelompok(id_proyek);
        }
    }

    handlePreviewProyek(id_proyek: any) {
        this.IsShowHasil = true;
        this.handleClickButtonEdit(id_proyek, 'preview');
    }

    handleExitPreview() {
        this.IsShowForm = false;
        this.IsShowHasil = false;
        this.Hasil = null;
        this.IsFormEdit = false;
        this.PageState = 'list';
        this.getAllProyek();
    }

    private getDetailKelompok(id_proyek: number) {
        const userData = JSON.parse(localStorage.getItem("_LPKDUD_") as any);

        this._proyekService
            .getDetailKelompok(userData.id_siswa, id_proyek)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    setTimeout(() => {
                        if (result.data.hasil.includes('Belum Ada Hasil') || result.data.hasil.length < 1) {
                            console.log("selected proyek =>", this.SelectedProyek);

                            const newData = {
                                ...result.data,
                                hasil: this.SelectedProyek.deskripsi,
                            };
                            this.Hasil = newData;
                        } else {
                            this.Hasil = result.data;
                        };

                        console.log("hasil =>", this.Hasil);
                    }, 2000);

                }
            })
    }

    handleChangeHasilKelompok(args: any) {
        this.Hasil = args.value ? args.value : null;
    }

    handleUpdateNilai(hasil: any) {
        const payload = {
            id_kelompok_proyek: hasil.id_kelompok_proyek,
            nilai_pertemuan_1: hasil.nilai_pertemuan_1,
            nilai_pertemuan_2: hasil.nilai_pertemuan_2,
            nilai_pertemuan_3: hasil.nilai_pertemuan_3,
            nilai_pertemuan_4: hasil.nilai_pertemuan_3,
            appresiasi: hasil.appresiasi
        };

        this._proyekService
            .updateNilaiKelompok(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    if (result.status) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Nilai berhasil disimpan' });
                    }
                }
            })
    }

    handleUpdateHasil(args: any) {
        const payload = {
            id_kelompok_proyek: args.id_kelompok_proyek,
            kelompok_proyek: args.kelompok_proyek,
            hasil: args.hasil
        };

        this._proyekService
            .updateHasilKelompok(payload)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Berhasil!', detail: 'Hasil Berhasil Diperbarui' });
                    this.getDetailKelompok(this.SelectedProyek.id_proyek);
                }
            })
    }

    handleUnduhProyek(data: any) {
        this._router.navigateByUrl(`/unduh-proyek?id_siswa=${data.detail_siswa[0].id_siswa.toString()}}&id_proyek=${this.SelectedProyek.id_proyek.toString()}`);
    }
}
