import { Injectable } from '@angular/core';
import { HttpOperationService } from './http-operation.service';
import { AuthenticationModel } from '../model/authentication.model';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

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

    register(payload: AuthenticationModel.IRegister): Observable<AuthenticationModel.Login> {
        return this._httpOperationService.postRequest(`${environment.apiUrl}/authentication/register`, payload);
    }

    private handleSignIn(data: AuthenticationModel.ILoginResponse) {
        localStorage.clear();
        localStorage.setItem("_LPKDUD_", JSON.stringify(data));
    }
}
