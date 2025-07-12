import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './components/home/home';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent }
    ])
  ]
};