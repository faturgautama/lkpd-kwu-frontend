import { TitleCasePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, map, catchError } from 'rxjs';
import { UtilityService } from './utility.service';

export class HttpBaseResponse {
    status!: boolean;
    message!: string;
    data: any;
}

@Injectable({
    providedIn: 'root'
})
export class HttpOperationService {

    constructor(
        private _httpClient: HttpClient,
        private _titleCasePipe: TitleCasePipe,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
    ) { }

    /**
     * @description Get Request Method
     * @param url 
     * @param queryString 
     * @returns Observable<HttpBaseResponse>
    */
    getRequest(url: string, queryString?: any): Observable<HttpBaseResponse> {
        this._utilityService.ShowLoading$.next(true);

        let query = {};

        if (Array.isArray(queryString)) {
            query = Object.assign({}, ...queryString);
        } else {
            query = queryString;
        }

        return this._httpClient.get<HttpBaseResponse>(url, {
            params: query
        }).pipe(
            map((result) => {
                this._utilityService.ShowLoading$.next(false);

                if (!result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'warn', summary: 'Oops', detail: this._titleCasePipe.transform(result.message) })
                }

                return result;
            }),
            catchError((error: any) => {
                this.handlingError(error);
                throw error;
            })
        )
    }

    /**
     * @description Post Request Method
     * @param url 
     * @param data 
     * @param showSuccessNotif -> (Optional) jika ingin menampilkan notification success
     * @returns Observable<HttpBaseResponse>
    */
    postRequest(url: string, data: any, showSuccessNotif?: boolean): Observable<HttpBaseResponse> {
        this._utilityService.ShowLoading$.next(true);

        return this._httpClient.post<HttpBaseResponse>(url, data)
            .pipe(
                map((result) => {
                    // ** Change state show loading
                    this._utilityService.ShowLoading$.next(false);

                    // ** Show success notification
                    if (result.status && showSuccessNotif) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: this._titleCasePipe.transform(result.message) });
                    }

                    // ** Jika status = false
                    if (!result.status) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'warn', summary: 'Oops', detail: this._titleCasePipe.transform(result.message) })

                    }

                    return result;
                }),
                catchError((error: any) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }

    /**
     * @description Post Request Method
     * @param url 
     * @param data 
     * @param showSuccessNotif -> (Optional) jika ingin menampilkan notification success
     * @returns Observable<HttpBaseResponse>
    */
    postRequestWithoutLoading(url: string, data: any): Observable<HttpBaseResponse> {
        return this._httpClient.post<HttpBaseResponse>(url, data)
            .pipe(
                map((result) => {
                    // ** Jika status = false
                    if (!result.status) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'warn', summary: 'Oops', detail: this._titleCasePipe.transform(result.message) })
                    }

                    return result;
                }),
                catchError((error: any) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }

    /**
     * @description Post Request Method For External API
     * @param url 
     * @param data 
     * @param showSuccessNotif -> (Optional) jika ingin menampilkan notification success
     * @returns Observable<any>
    */
    postRequestExternal(url: string, data: any, showSuccessNotif?: boolean): Observable<any> {
        this._utilityService.ShowLoading$.next(true);

        return this._httpClient.post<any>(url, data)
            .pipe(
                map((result) => {
                    // ** Change state show loading
                    this._utilityService.ShowLoading$.next(false);

                    // ** Show success notification
                    if (result && showSuccessNotif) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: this._titleCasePipe.transform(result.message) });
                    }

                    // ** Jika status = false
                    if (!result) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'warn', summary: 'Oops', detail: this._titleCasePipe.transform(result.message) })
                    }

                    return result;
                }),
                catchError((error: any) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }


    /**
     * @description Put Request Method
     * @param url 
     * @param data 
     * @param showSuccessNotif -> (Optional) jika ingin menampilkan notification success
     * @returns Observable<HttpBaseResponse>
    */
    putRequest(url: string, data: any, showSuccessNotif?: boolean): Observable<HttpBaseResponse> {
        this._utilityService.ShowLoading$.next(true);

        return this._httpClient.put<HttpBaseResponse>(url, data)
            .pipe(
                map((result) => {
                    // ** Change state show loading
                    this._utilityService.ShowLoading$.next(false);

                    // ** Show success notification
                    if (result.status && showSuccessNotif) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: this._titleCasePipe.transform(result.message) });
                    }

                    // ** Jika status = false
                    if (!result.status) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'warn', summary: 'Oops', detail: this._titleCasePipe.transform(result.message) })

                    }


                    return result;
                }),
                catchError((error: any) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }

    /**
     * @description Delete Request Method
     * @param url 
     * @param data 
     * @param showSuccessNotif -> (Optional) jika ingin menampilkan notification success
     * @returns Observable<HttpBaseResponse>
    */
    deleteRequest(url: string, showSuccessNotif?: boolean): Observable<HttpBaseResponse> {
        this._utilityService.ShowLoading$.next(true);

        return this._httpClient.delete<HttpBaseResponse>(url)
            .pipe(
                map((result) => {
                    // ** Change state show loading
                    this._utilityService.ShowLoading$.next(false);

                    // ** Show success notification
                    if (result.status && showSuccessNotif) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: this._titleCasePipe.transform(result.message) });
                    }

                    // ** Jika status = false
                    if (!result.status) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'warn', summary: 'Oops', detail: this._titleCasePipe.transform(result.message) })

                    }

                    return result;
                }),
                catchError((error: any) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }

    private handlingError(error: HttpErrorResponse): void {
        this._utilityService.ShowLoading$.next(false);
        this._messageService.clear();
        this._messageService.add({ severity: 'error', summary: error.statusText, detail: error.error.message.message })
    }
}
