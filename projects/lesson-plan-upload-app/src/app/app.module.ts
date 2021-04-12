import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {ResponseLoggingInterceptor} from './core/response-logging-interceptor';
import { ProgressSpinnerOverlayComponent } from './core/progress-spinner-overlay/progress-spinner-overlay.component';

const routes: Routes = [
  {
    path: 'lesson-plan-upload',
    loadChildren: () => import('./lesson-plan-upload/lesson-plan-upload.module').then(m => m.LessonPlanUploadModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'lesson-plan-upload'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProgressSpinnerOverlayComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseLoggingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
