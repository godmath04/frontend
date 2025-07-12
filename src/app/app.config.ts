import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // ✅ requerido para usar HttpClient en servicios
    provideRouter([
      { path: '', component: HomeComponent }
    ])
  ]
};