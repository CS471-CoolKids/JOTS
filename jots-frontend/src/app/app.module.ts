import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { TutorratingComponent } from './tutorrating/tutorrating.component';
import { RatingformComponent } from './ratingform/ratingform.component';
import { RouterModule } from '@angular/router';
import { TutorappComponent } from './tutorapp/tutorapp.component';
import { TutorsignupComponent } from './tutorsignup/tutorsignup.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        TutorratingComponent,
        RatingformComponent,
        TutorappComponent,
        TutorsignupComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        //fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };