import { Injectable } from '@angular/core';
import { HttpOperationService } from './http-operation.service';
import { AuthenticationModel } from '../model/authentication.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    Profile$ = new BehaviorSubject<any>(null);

    constructor(
        private _httpOperationService: HttpOperationService,
    ) { }

    signIn(payload: AuthenticationModel.ILogin): Observable<AuthenticationModel.Login> {
        return this._httpOperationService
            .postRequest(`${environment.apiUrl}/authentication/sign-in`, payload)
            .pipe(
                tap((result) => {
                    if (result.status) {
                        this.handleSignIn(result.data);
                    }
                })
            )
    }

    getProfile() {
        return this._httpOperationService
            .getRequest(`${environment.apiUrl}/authentication/profile`)
            .pipe(
                tap((result) => {
                    if (result.status) {
                        result.data.is_guru = result.data.is_guru ? result.data.is_guru : false;
                        this.Profile$.next(result.data);
                    }
                })
            )
    }

    register(payload: AuthenticationModel.IRegister): Observable<AuthenticationModel.Login> {
        return this._httpOperationService.postRequest(`${environment.apiUrl}/authentication/register`, payload);
    }

    updateProfile(payload: AuthenticationModel.UpdateProfile): Observable<AuthenticationModel.Login> {
        return this._httpOperationService.putRequest(`${environment.apiUrl}/authentication/profile`, payload);
    }

    private handleSignIn(data: AuthenticationModel.ILoginResponse) {
        localStorage.clear();
        data.is_guru = data.is_guru ? data.is_guru : false;
        localStorage.setItem("_LPKDUD_", JSON.stringify(data));
    }
}
