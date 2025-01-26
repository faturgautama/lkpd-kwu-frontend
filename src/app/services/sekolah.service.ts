import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SekolahModel } from '../model/sekolah.model';
import { HttpOperationService, HttpBaseResponse } from './http-operation.service';

@Injectable({
    providedIn: 'root'
})
export class SekolahService {

    constructor(
        private _httpOperationService: HttpOperationService,
    ) { }

    getAll(): Observable<SekolahModel.GetAllSekolah> {
        return this._httpOperationService.getRequest(`${environment.apiUrl}/sekolah`);
    }

    getById(id_sekolah: any): Observable<SekolahModel.GetAllSekolah> {
        return this._httpOperationService.getRequest(`${environment.apiUrl}/sekolah/retrieve/${id_sekolah}`);
    }

    create(data: SekolahModel.CreateSekolah): Observable<HttpBaseResponse> {
        return this._httpOperationService.postRequest(`${environment.apiUrl}/sekolah`, data);
    }

    update(data: SekolahModel.UpdateSekolah): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequest(`${environment.apiUrl}/sekolah`, data);
    }
}
