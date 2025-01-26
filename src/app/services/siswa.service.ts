import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpOperationService, HttpBaseResponse } from './http-operation.service';
import { SiswaModel } from '../model/siswa.model';

@Injectable({
    providedIn: 'root'
})
export class SiswaService {

    constructor(
        private _httpOperationService: HttpOperationService,
    ) { }

    getAll(query: SiswaModel.ISiswaQueryParams): Observable<SiswaModel.GetAllSiswa> {
        return this._httpOperationService.getRequest(`${environment.apiUrl}/siswa`, query);
    }

    getById(id_siswa: any): Observable<SiswaModel.GetAllSiswa> {
        return this._httpOperationService.getRequest(`${environment.apiUrl}/siswa/retrieve/${id_siswa}`);
    }

    create(data: SiswaModel.CreateSiswa): Observable<HttpBaseResponse> {
        return this._httpOperationService.postRequest(`${environment.apiUrl}/siswa`, data);
    }

    update(data: SiswaModel.UpdateSiswa): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequest(`${environment.apiUrl}/siswa`, data);
    }
}
