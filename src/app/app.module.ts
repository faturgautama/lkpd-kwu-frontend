import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';

import { AppComponent } from './app.component';
import { TitleCasePipe } from '@angular/common';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LoadingDialogComponent } from './components/dialog/loading-dialog/loading-dialog.component';
import { JwtInterceptor } from './middleware/jwt.interceptor';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        }),
        ToastModule,
        LoadingDialogComponent,
    ],
    providers: [
        MessageService,
        ConfirmationService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        TitleCasePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
