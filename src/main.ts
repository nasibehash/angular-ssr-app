import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { API_BASE_URL } from './app/core/constants/api-base-url.token';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {routes} from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: API_BASE_URL, useValue: 'http://localhost:4000/api/' }
  ]
});
