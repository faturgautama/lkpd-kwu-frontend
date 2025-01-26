import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KuisModel } from '../model/kuis.model';
import { HttpOperationService, HttpBaseResponse } from './http-operation.service';

@Injectable({
    providedIn: 'root'
})
export class KuisService {

    constructor(
        private _httpOperationService: HttpOperationService,
    ) { }

    getAll(query: KuisModel.IKuisQueryParams): Observable<KuisModel.GetAllKuis> {
        return this._httpOperationService
            .getRequest(`${environment.apiUrl}/kuis`, query)
            .pipe(
                map((result) => {
                    result.data = result.data.filter((item: any) => item.is_active == true);
                    return result;
                })
            )
    }

    getById(id_kuis: any): Observable<KuisModel.GetAllKuis> {
        return this._httpOperationService.getRequest(`${environment.apiUrl}/kuis/retrieve/${id_kuis}`);
    }

    create(data: KuisModel.CreateKuis): Observable<HttpBaseResponse> {
        return this._httpOperationService.postRequest(`${environment.apiUrl}/kuis`, data);
    }

    update(data: KuisModel.UpdateKuis): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequest(`${environment.apiUrl}/kuis`, data);
    }

    delete(data: KuisModel.UpdateKuis): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequest(`${environment.apiUrl}/kuis`, {
            ...data,
            is_active: !data.is_active
        });
    }

    createPertanyaan(data: KuisModel.CreateNewPertanyaanKuis): Observable<HttpBaseResponse> {
        return this._httpOperationService.postRequest(`${environment.apiUrl}/kuis/add-pertanyaan`, data);
    }

    updatePertanyaan(data: KuisModel.UpdatePertanyaanKuis): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequest(`${environment.apiUrl}/kuis/update-pertanyaan`, data);
    }

    deletePertanyaan(id_pertanyaan: any): Observable<HttpBaseResponse> {
        return this._httpOperationService.deleteRequest(`${environment.apiUrl}/kuis/delete-pertanyaan/${id_pertanyaan}`);
    }

    submitJawaban(data: KuisModel.CreateJawabanKuis): Observable<HttpBaseResponse> {
        return this._httpOperationService.postRequest(`${environment.apiUrl}/kuis/insert-pertanyaan`, data);
    }
}
