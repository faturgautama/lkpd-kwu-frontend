import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { Subject, takeUntil } from 'rxjs';
import { MainComponent } from 'src/app/components/layout/main/main.component';
import { KelasModel } from 'src/app/model/kelas.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { KelasService } from 'src/app/services/kelas.service';
import { NilaiService } from 'src/app/services/nilai.service';

@Component({
    selector: 'app-nilai',
    standalone: true,
    imports: [
        CommonModule,
        MainComponent,
        DropdownModule,
    ],
    templateUrl: './nilai.component.html',
    styleUrl: './nilai.component.scss'
})
export class NilaiComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    Profile$ = this._authenticationService
        .Profile$
        .pipe(takeUntil(this.Destroy$));

    IsGuru = false;

    KelasDatasource: KelasModel.IKelas[] = [];

    Siswa: any[] = [];

    constructor(
        private _nilaiService: NilaiService,
        private _kelasService: KelasService,
        private _authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        this.Profile$
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.IsGuru = result.is_guru;

                if (this.IsGuru) {
                    this.getAllKelas();
                } else {
                    this.getNilaiPerSiswa();
                }
            })
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

    handleChangeKelas(args: any) {
        if (args.value) {
            this.getNilaiPerKelas(args.value);
        }
    }

    private getNilaiPerKelas(id_kelas: number) {
        this._nilaiService
            .getPerKelas(id_kelas)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.Siswa = result.data;
                }
            })
    }

    private getNilaiPerSiswa() {
        const userData = JSON.parse(localStorage.getItem("_LPKDUD_") as any);

        this._nilaiService
            .getPerSiswa(userData.id_siswa)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this.Siswa = [result.data];
                }
            })
    }
}
