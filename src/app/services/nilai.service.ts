import { Injectable } from '@angular/core';
import { NilaiModel } from '../model/nilai.model';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpOperationService } from './http-operation.service';

@Injectable({
    providedIn: 'root'
})
export class NilaiService {

    constructor(
        private _httpOperationService: HttpOperationService,
    ) { }

    getPerKelas(id_kelas: number): Observable<NilaiModel.GetNilaiByKelas> {
        return this._httpOperationService
            .getRequest(`${environment.apiUrl}/nilai/per-kelas/${id_kelas}`)
            .pipe(
                map((result) => {
                    result.data = result.data.map((item: any) => {
                        return {
                            ...item,
                            toggle: false,
                        }
                    })

                    return result;
                })
            )
    }

    getPerSiswa(id_siswa: number): Observable<NilaiModel.GetNilaiByKelas> {
        return this._httpOperationService
            .getRequest(`${environment.apiUrl}/nilai/per-siswa/${id_siswa}`)
            .pipe(
                map((result) => {
                    result.data.toggle = true;
                    return result;
                })
            )
    }

    syncToSheet(): Observable<any> {
        return this._httpOperationService.getRequest(`${environment.apiUrl}/nilai/sync-sheet`);
    }
}
