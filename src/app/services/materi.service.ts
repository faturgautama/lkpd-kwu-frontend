import { Injectable } from '@angular/core';
import { HttpBaseResponse, HttpOperationService } from './http-operation.service';
import { MateriModel } from '../model/materi.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MateriService {

    constructor(
        private _httpOperationService: HttpOperationService,
    ) { }

    getAll(query: MateriModel.IMateriQueryParams): Observable<MateriModel.GetAllMateri> {
        return this._httpOperationService.getRequest(`${environment.apiUrl}/materi`, query);
    }

    getById(id_materi: any): Observable<MateriModel.GetAllMateri> {
        return this._httpOperationService.getRequest(`${environment.apiUrl}/materi/retrieve/${id_materi}`);
    }

    create(data: MateriModel.CreateMateri): Observable<HttpBaseResponse> {
        return this._httpOperationService.postRequest(`${environment.apiUrl}/materi`, data);
    }

    update(data: MateriModel.UpdateMateri): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequest(`${environment.apiUrl}/materi`, data);
    }

    delete(id_materi: any): Observable<HttpBaseResponse> {
        return this._httpOperationService.deleteRequest(`${environment.apiUrl}/materi/${id_materi}`);
    }
}
