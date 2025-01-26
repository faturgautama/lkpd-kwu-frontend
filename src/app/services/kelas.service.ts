import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KelasModel } from '../model/kelas.model';
import { HttpOperationService, HttpBaseResponse } from './http-operation.service';

@Injectable({
    providedIn: 'root'
})
export class KelasService {

    constructor(
        private _httpOperationService: HttpOperationService,
    ) { }

    getAll(): Observable<KelasModel.GetAllKelas> {
        return this._httpOperationService.getRequest(`${environment.apiUrl}/kelas`);
    }

    getById(id_kelas: any): Observable<KelasModel.GetAllKelas> {
        return this._httpOperationService.getRequest(`${environment.apiUrl}/kelas/retrieve/${id_kelas}`);
    }

    create(data: KelasModel.CreateKelas): Observable<HttpBaseResponse> {
        return this._httpOperationService.postRequest(`${environment.apiUrl}/kelas`, data);
    }

    update(data: KelasModel.UpdateKelas): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequest(`${environment.apiUrl}/kelas`, data);
    }
}
