import { Injectable } from '@angular/core';
import { HttpBaseResponse, HttpOperationService } from './http-operation.service';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SimulasiService {

    constructor(
        private _httpOperationService: HttpOperationService,
    ) { }

    getAll(query: any): Observable<HttpBaseResponse> {
        return this._httpOperationService.getRequest(`${environment.apiUrl}/simulasi`, query);
    }

    update(data: any): Observable<HttpBaseResponse> {
        return this._httpOperationService.putRequest(`${environment.apiUrl}/simulasi`, data);
    }

}
