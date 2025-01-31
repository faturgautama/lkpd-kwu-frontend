import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReferensiModel } from '../model/referensi.model';
import { HttpOperationService, HttpBaseResponse } from './http-operation.service';

@Injectable({
    providedIn: 'root'
})
export class ReferensiService {

    constructor(
        private _httpOperationService: HttpOperationService,
    ) { }

    getAll(query: ReferensiModel.IReferensiQueryParams): Observable<ReferensiModel.GetAllReferensi> {
        return this._httpOperationService.getRequest(`${environment.apiUrl}/referensi`, query);
    }

    getById(id_referensi: any): Observable<ReferensiModel.GetByIdReferensi> {
        return this._httpOperationService.getRequest(`${environment.apiUrl}/referensi/retrieve/${id_referensi}`);
    }

    create(data: ReferensiModel.CreateReferensi): Observable<HttpBaseResponse> {
        return this._httpOperationService.postRequest(`${environment.apiUrl}/referensi`, data);
    }

    update(data: ReferensiModel.UpdateReferensi): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequest(`${environment.apiUrl}/referensi`, data);
    }

    delete(id_referensi: any): Observable<HttpBaseResponse> {
        return this._httpOperationService.deleteRequest(`${environment.apiUrl}/referensi/${id_referensi}`);
    }
}
