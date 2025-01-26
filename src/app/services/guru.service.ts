import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GuruModel } from '../model/guru.model';
import { HttpOperationService, HttpBaseResponse } from './http-operation.service';

@Injectable({
    providedIn: 'root'
})
export class GuruService {

    constructor(
        private _httpOperationService: HttpOperationService,
    ) { }

    getAll(): Observable<GuruModel.GetAllGuru> {
        return this._httpOperationService.getRequest(`${environment.apiUrl}/guru`);
    }

    getById(id_guru: any): Observable<GuruModel.GetAllGuru> {
        return this._httpOperationService.getRequest(`${environment.apiUrl}/guru/retrieve/${id_guru}`);
    }

    create(data: GuruModel.CreateGuru): Observable<HttpBaseResponse> {
        return this._httpOperationService.postRequest(`${environment.apiUrl}/guru`, data);
    }

    update(data: GuruModel.UpdateGuru): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequest(`${environment.apiUrl}/guru`, data);
    }
}
