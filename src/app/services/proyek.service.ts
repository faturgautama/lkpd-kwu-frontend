import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpOperationService, HttpBaseResponse } from './http-operation.service';
import { ProyekModel } from '../model/proyek.model';

@Injectable({
    providedIn: 'root'
})
export class ProyekService {

    constructor(
        private _httpOperationService: HttpOperationService,
    ) { }

    getAll(query: ProyekModel.IProyekQueryParams): Observable<ProyekModel.GetAllProyek> {
        return this._httpOperationService
            .getRequest(`${environment.apiUrl}/proyek`, query)
            .pipe(
                map((result) => {
                    result.data = result.data.filter((item: any) => item.is_active == true);
                    return result;
                })
            )
    }

    getById(id_proyek: any): Observable<ProyekModel.GetAllProyek> {
        return this._httpOperationService.getRequest(`${environment.apiUrl}/proyek/retrieve/${id_proyek}`);
    }

    create(data: ProyekModel.CreateProyek): Observable<HttpBaseResponse> {
        return this._httpOperationService.postRequest(`${environment.apiUrl}/proyek`, data);
    }

    update(data: ProyekModel.UpdateProyek): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequest(`${environment.apiUrl}/proyek`, data);
    }

    updateNilaiKelompok(data: ProyekModel.UpdateNilaiProyekKelompok): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequest(`${environment.apiUrl}/proyek/update-nilai-kelompok`, data);
    }

    updateHasilKelompok(data: ProyekModel.UpdateProyekKelompok): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequest(`${environment.apiUrl}/proyek/update-kelompok`, data);
    }

    deleteKelompok(id_kelompok_proyek: any): Observable<HttpBaseResponse> {
        return this._httpOperationService.deleteRequest(`${environment.apiUrl}/proyek/delete-kelompok/${id_kelompok_proyek}`);
    }

    createSiswaKelompok(data: ProyekModel.CreateProyekSiswaKelompok): Observable<HttpBaseResponse> {
        return this._httpOperationService.postRequest(`${environment.apiUrl}/proyek/add-siswa-kelompok`, data);
    }

    updateSiswaKelompok(data: ProyekModel.UpdateProyekSiswaKelompok): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequest(`${environment.apiUrl}/proyek/update-siswa-kelompok`, data);
    }

    deleteSiswaKelompok(id_siswa_kelompok_proyek: any): Observable<HttpBaseResponse> {
        return this._httpOperationService.deleteRequest(`${environment.apiUrl}/proyek/delete-siswa-kelompok/${id_siswa_kelompok_proyek}`);
    }
}
