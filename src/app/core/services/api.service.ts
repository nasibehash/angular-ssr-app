import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../constants/api-base-url.token';
import {isPlatformBrowser, isPlatformServer } from '@angular/common';
import {inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/core';

import {Observable, of, tap } from 'rxjs';
import {log} from 'node:util';
@Injectable({ providedIn: 'root' })
export class ApiService {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private baseUrl = inject(API_BASE_URL);
  private state = inject(TransferState);

   GREETING_KEY = makeStateKey<{ message: string }>('greeting');

  getWelcome(name: string): Observable<{ message: string }> | null {
    console.log('plat',this.platformId);
    if (isPlatformServer(this.platformId)) {
      return this.http
          .post<{ message: string }>(`${this.baseUrl}welcome`, { name })
          .pipe(
              tap((data) => {
                this.state.set(this.GREETING_KEY, data);
              })
          );
    } else if (isPlatformBrowser(this.platformId)) {
      const cached = this.state.get(this.GREETING_KEY, null);
      if (cached) {
        return of(cached);
      }
    }

    return null;
  }

  // getWelcome(name: string) {
  //   if (isPlatformServer(this.platformId)) {
  //     return this.http.post<{ message: string }>(`${this.baseUrl}welcome`, { name });
  //   } else {
  //     return of(null);
  //   }
  // }
}
