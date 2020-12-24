import { TranslateService } from './common/service/translate/translate.service';
import { CardModule } from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AppComponent } from './app.component';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { AppCommonModule } from './common/app-common.module';
import { LandingComponent } from './landing/landing.component';
import {BrowserModule } from '@angular/platform-browser';

import { AppResuseStrategy } from './app.route.reuse.strategy';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';


const routes: Routes[] = [

];
@NgModule({
    declarations: [
        AppComponent,
        LandingComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppCommonModule,
        DialogModule,
        ButtonModule,
        RouterModule.forRoot([

            { path: 'user', loadChildren: () => import('src/app/user/user.module').then(m => m.UserModule) },
            { path: 'home', loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule) }

        ] ),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

    ],
    providers: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
