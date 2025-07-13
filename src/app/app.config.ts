import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { provideHttpClient } from '@angular/common/http';
import { ResultadoComponent } from './components/resultado/resultado'; 


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), 
    provideRouter([
      { path: '', component: HomeComponent },
      {path: 'resultado', component: ResultadoComponent}
    ])
  ]
};