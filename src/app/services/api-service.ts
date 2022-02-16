import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { T101Request, T101Response } from '../models/t101';

@Injectable({
  providedIn: 'root',
})
export class ApiVService {
  private _baseUrl;

  constructor() {
    this._baseUrl =
      'https://efristest.ura.go.ug/efrisws/ws/taapp/getInformation';
  }

  // t101Command(command: T101Request): Observable<T101Response> {
  //   return this.http.post<T101Response>(`${this._baseUrl}`, command);
  // }
}
